export const API_KEY = 'd4ce58291563d75e99b7ef190f9b155b';

export async function getBandirmaWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.3522&lon=27.9767&appid=${API_KEY}&units=metric&lang=tr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Hava durumu verisi alınamadı');
  }

  const data = await response.json();
  return data;
}