export async function getBandirmaNews() {
  const rssUrl = encodeURIComponent('https://www.pandermos.com/rss/');
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Haber verisi alınamadı: ${response.status}`);
  }

  const data = await response.json();

  if (!data.items || !Array.isArray(data.items)) {
    throw new Error('Beklenmeyen haber veri formatı');
  }

  const mappedNews = data.items.map((item, index) => ({
    id: item.guid || item.link || index.toString(),
    title: item.title || 'Başlık yok',
    summary: cleanHtml(item.description || item.content || ''),
    link: item.link || '',
    image: extractImage(item),
    publishedAt: item.pubDate || '',
    source: data.feed?.title || 'Pandermos',
    isBandirma: isBandirmaRelated(item),
  }));

  const bandirmaNews = mappedNews.filter((item) => item.isBandirma);
  const otherNews = mappedNews.filter((item) => !item.isBandirma);

  // Önce Bandırma haberleri gelsin, yetmezse diğerlerini ekle
  return [...bandirmaNews, ...otherNews].slice(0, 15);
}

function isBandirmaRelated(item) {
  const text = `${item.title || ''} ${item.description || ''} ${item.link || ''}`.toLowerCase();

  return (
    text.includes('bandırma') ||
    text.includes('bandirma') ||
    text.includes('/bandirma')
  );
}

function cleanHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractImage(item) {
  if (item.enclosure?.link) return item.enclosure.link;
  if (item.thumbnail) return item.thumbnail;

  const match = item.description?.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}