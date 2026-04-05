import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { getEarthquakes } from '../services/earthquakeService';

export default function EarthquakeScreen() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEarthquakes();
        setEarthquakes(data);
        console.log('ILK DEPREM:', data[0]);
      } catch (err) {
        console.log('EARTHQUAKE ERROR:', err);
        setError('Deprem verisi alınamadı');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  function formatDate(item) {
  const rawDate =
    item.date ||
    item.date_time ||
    item.time ||
    item.timestamp ||
    item.created_at;

  if (!rawDate) return 'Tarih yok';

  const date = new Date(rawDate);

  if (isNaN(date)) return String(rawDate);

  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


  const getMagnitudeColor = (mag) => {
    if (mag >= 5) return '#D64545';
    if (mag >= 4) return '#F39C12';
    return '#2E86DE';
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A6CF7" />
        <Text style={styles.loadingText}>Deprem verileri yükleniyor...</Text>
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

  if (earthquakes.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Bandırma'ya yakın deprem bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Bandırma'ya Yakın Depremler</Text>
      <Text style={styles.pageSubtitle}>
        Bandırma çevresindeki son deprem kayıtları
      </Text>

      <FlatList
        data={earthquakes}
        keyExtractor={(item, index) =>
          item.earthquake_id?.toString() || index.toString()
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <Text style={styles.location} numberOfLines={2}>
                {item.title || 'Konum bilgisi yok'}
              </Text>

              <View
                style={[
                  styles.magnitudeBadge,
                  { backgroundColor: getMagnitudeColor(item.mag || 0) },
                ]}
              >
                <Text style={styles.magnitudeText}>
                  {item.mag ?? '-'}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tarih</Text>
              <Text style={styles.infoValue}>
              {formatDate(item)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Derinlik</Text>
              <Text style={styles.infoValue}>
                {item.depth != null ? `${item.depth} km` : 'Bilinmiyor'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Bandırma'ya Uzaklık</Text>
              <Text style={styles.infoValue}>
                {item.distanceKm != null
                  ? `${item.distanceKm.toFixed(1)} km`
                  : 'Bilinmiyor'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kaynak</Text>
              <Text style={styles.infoValue}>
                {item.provider?.toUpperCase() || 'AFAD'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FB',
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
    color: '#1E2A3A',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#69748C',
    marginTop: 4,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  location: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A3A',
    lineHeight: 22,
  },
  magnitudeBadge: {
    minWidth: 54,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  magnitudeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#69748C',
  },
  infoValue: {
    fontSize: 13,
    color: '#1E2A3A',
    fontWeight: '600',
    maxWidth: '65%',
    textAlign: 'right',
  },
});