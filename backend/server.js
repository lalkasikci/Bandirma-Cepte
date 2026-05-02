const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/events", async (req, res) => {
  try {
    const url = "https://www.bandirma.bel.tr/etkinlikler";

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);
    const events = [];

    const unwantedTitles = [
      "HIZLI MENÜ",
      "BİZE ULAŞIN",
      "CANLI YAYIN",
      "TÜMÜ",
      "EĞİTİM",
      "SOSYAL",
      "BAYRAM",
      "TİYATROLAR",
      "SERGİLER",
      "KONSER - DİNLETİLER",
      "SÖYLEŞİ VE PANELLER",
      "FİLM GÖSTERİMLERİ",
      "DETAYLI BİLGİ",
      "DİĞER ETKİNLİKLER",
      "AÇILIŞ",
      "KİTAP GÜNLERİ",
      "YARIYIL ŞENLİĞİ",
      "RAMAZAN AYI ETKİNLİKLERİ",
    ];

    $("a").each((i, el) => {
      const title = $(el).text().replace(/\s+/g, " ").trim();
      const href = $(el).attr("href");

      const isRealEvent =
        href &&
        href.includes("etkinlik") &&
        title.length > 8 &&
        !unwantedTitles.includes(title.toUpperCase());

      if (isRealEvent) {
        events.push({
          id: String(i),
          title,
          detailUrl: href.startsWith("http")
            ? href
            : `https://www.bandirma.bel.tr${href}`,
          category: "Bandırma Belediyesi Etkinliği",
        });
      }
    });

    const uniqueEvents = events.filter(
      (event, index, self) =>
        index === self.findIndex((e) => e.title === event.title)
    );

    res.json(uniqueEvents);
  } catch (error) {
    console.log("EVENT ERROR:", error.message);

    res.status(500).json({
      message: "Etkinlik verileri alınamadı",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Backend çalışıyor: http://localhost:3000");
});