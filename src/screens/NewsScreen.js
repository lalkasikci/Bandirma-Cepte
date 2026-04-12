import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image
} from 'react-native';
import { getBandirmaNews } from '../services/newsService';

export default function NewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getBandirmaNews();
        setNews(data);
      } catch (err) {
        console.log('NEWS ERROR:', err);
        setError('Haberler alınamadı');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return 'Tarih yok';

    const date = new Date(dateString);

    if (isNaN(date)) return 'Tarih yok';

    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }



  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#5B6EF5" />
        <Text style={styles.loadingText}>Bandırma haberleri yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (news.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Bandırma ile ilgili haber bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Bandırma Haberleri</Text>
      <Text style={styles.pageSubtitle}>
        Yerel kaynaklardan güncel haberler
      </Text>

      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('NewsDetail', { item })}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.newsImage} />
            ) : null}

            <View style={styles.cardContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>

              <Text style={styles.newsSummary} numberOfLines={3}>
                {item.summary || 'Özet bulunamadı'}
              </Text>

              <View style={styles.footerRow}>
                <Text style={styles.newsMeta}>{item.source}</Text>
                <Text style={styles.newsMeta}>{formatDate(item.publishedAt)}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FC',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: '#D64545',
    fontWeight: '600',
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#182033',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#69748C',
    marginTop: 4,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#1B1F2A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#182033',
    lineHeight: 24,
    marginBottom: 10,
  },
  newsSummary: {
    fontSize: 14,
    color: '#5F6B7A',
    lineHeight: 21,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  newsMeta: {
    fontSize: 12,
    color: '#8A92A3',
    flexShrink: 1,
  },
});