const BANDIRMA_LAT = 40.3522;
const BANDIRMA_LON = 27.9767;

const MAX_DISTANCE_KM = 150;

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function getEarthquakes() {
  const url = 'https://api.orhanaydogdu.com.tr/deprem/afad/live?limit=50';

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Deprem verisi alınamadı: ${response.status}`);
  }

  const data = await response.json();

  if (!data.status || !Array.isArray(data.result)) {
    throw new Error('Beklenmeyen veri formatı');
  }

  const filtered = data.result
    .map((item) => {
      const coordinates = item.geojson?.coordinates;

      if (!coordinates || coordinates.length < 2) {
        return null;
      }

      const [lon, lat] = coordinates;

      const distanceKm = calculateDistanceKm(
        BANDIRMA_LAT,
        BANDIRMA_LON,
        lat,
        lon
      );

      return {
        ...item,
        distanceKm,
      };
    })
    .filter((item) => item && item.distanceKm <= MAX_DISTANCE_KM)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return filtered;
}