import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getBandirmaWeather } from '../services/weatherService';

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await getBandirmaWeather();
        setWeather(data);
      } catch (err) {
        setError('Veri alınırken hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A6CF7" />
        <Text style={styles.loadingText}>Hava durumu yükleniyor...</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.city}>Bandırma</Text>
      <Text style={styles.pageTitle}>Güncel Hava Durumu</Text>

      <View style={styles.mainCard}>
        <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.description}>
          {weather.weather[0].description}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Nem</Text>
          <Text style={styles.value}>%{weather.main.humidity}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Rüzgar</Text>
          <Text style={styles.value}>{weather.wind.speed} m/s</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Hissedilen</Text>
          <Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Basınç</Text>
          <Text style={styles.value}>{weather.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingHorizontal: 20,
    paddingTop: 30,
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
  },
  city: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E2A3A',
  },
  pageTitle: {
    fontSize: 16,
    color: '#69748C',
    marginTop: 4,
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: '#4A6CF7',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 18,
    color: '#EAF0FF',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#69748C',
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2A3A',
  },
});