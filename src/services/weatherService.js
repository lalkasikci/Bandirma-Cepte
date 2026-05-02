const API_KEY = 'd4ce58291563d75e99b7ef190f9b155b';
const BANDIRMA_LAT = 40.3522;
const BANDIRMA_LON = 27.9767;

export async function getBandirmaWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${BANDIRMA_LAT}&lon=${BANDIRMA_LON}&appid=${API_KEY}&units=metric&lang=tr`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Güncel hava durumu verisi alınamadı');
  }

  return await response.json();
}

export async function getBandirmaForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${BANDIRMA_LAT}&lon=${BANDIRMA_LON}&appid=${API_KEY}&units=metric&lang=tr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('5 günlük tahmin verisi alınamadı');
  }

  const data = await response.json();

  if (!data.list || !Array.isArray(data.list)) {
    throw new Error('Tahmin verisi formatı beklenenden farklı');
  }

  return simplifyForecast(data.list);
}

function simplifyForecast(list) {
  const dailyMap = {};

  for (const item of list) {
    const date = item.dt_txt?.split(' ')[0];
    const time = item.dt_txt?.split(' ')[1];

    if (!date) continue;

    if (!dailyMap[date]) {
      dailyMap[date] = item;
    }

    // 12:00 verisini yakalarsak o günü onunla temsil et
    if (time === '12:00:00') {
      dailyMap[date] = item;
    }
  }

  return Object.values(dailyMap).slice(0, 5).map((item) => ({
    date: item.dt_txt,
    temp: Math.round(item.main.temp),
    tempMin: Math.round(item.main.temp_min),
    tempMax: Math.round(item.main.temp_max),
    description: item.weather?.[0]?.description || '',
    main: item.weather?.[0]?.main || '',
  }));
}
