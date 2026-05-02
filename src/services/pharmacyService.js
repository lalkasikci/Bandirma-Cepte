import axios from 'axios';

const PHARMACY_URL = 'https://www.bandirma.bel.tr/nobetci-eczane';

export const getDutyPharmacies = async () => {
  try {
    const response = await axios.get(PHARMACY_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const html = response.data;

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const dateMatch = text.match(/(\d{2}\s+[A-Za-zÇĞİÖŞÜçğıöşü]+\s+\d{4})\s+Bugün Nöbetçi Eczaneler/);
    const date = dateMatch ? dateMatch[1] : 'Bugün';

    const start = text.indexOf('Eczane Adı Adres Telefon');
    const end = text.indexOf('ARA', start);

    if (start === -1) {
      console.log('Eczane başlangıç metni bulunamadı');
      return { date, pharmacies: [] };
    }

    const pharmacyText = text.slice(start, end === -1 ? undefined : end);

    const pharmacyRegex = /([A-ZÇĞİÖŞÜ\s]+ECZANESİ)\s+(.+?)\s+(0\d{10})/g;

    const pharmacies = [];
    let match;

    while ((match = pharmacyRegex.exec(pharmacyText)) !== null) {
      pharmacies.push({
        id: String(pharmacies.length + 1),
        name: match[1].trim(),
        address: match[2].trim(),
        phone: match[3].trim(),
      });
    }

    console.log('Bulunan eczaneler:', pharmacies);

    return {
      date,
      pharmacies,
    };
  } catch (error) {
    console.log('Nöbetçi eczane verisi çekilemedi:', error.message);

    return {
      date: 'Bugün',
      pharmacies: [],
    };
  }
};