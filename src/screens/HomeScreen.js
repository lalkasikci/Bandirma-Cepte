import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { getBandirmaWeather } from '../services/weatherService';
import { getEarthquakes } from '../services/earthquakeService';
import { getBandirmaNews } from '../services/newsService';

export default function HomeScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [earthquake, setEarthquake] = useState(null);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [weatherData, earthquakeData, newsData] = await Promise.all([
          getBandirmaWeather(),
          getEarthquakes(),
          getBandirmaNews(),
        ]);

        setWeather(weatherData);

        if (earthquakeData && earthquakeData.length > 0) {
          setEarthquake(earthquakeData[0]);
        }

        if (newsData && newsData.length > 0) {
          setNews(newsData[0]);
        }
      } catch (error) {
        console.log('HOME SCREEN DATA ERROR:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  function getWeatherValue() {
    if (loading) return '...';
    if (!weather) return '--';
    return `${Math.round(weather.main.temp)}°`;
  }

  function getWeatherDescription() {
    if (loading) return 'Yükleniyor...';
    if (!weather) return 'Veri alınamadı';
    return weather.weather?.[0]?.description || 'Bilgi yok';
  }

  function getEarthquakeMagnitude() {
    if (loading) return '...';
    if (!earthquake) return '--';
    return `${earthquake.mag ?? '--'}`;
  }

  function getEarthquakeLocation() {
    if (loading) return 'Yükleniyor...';
    if (!earthquake) return 'Deprem verisi yok';
    return shortenText(earthquake.title || 'Konum bilgisi yok', 30);
  }

  function getEarthquakeDistance() {
    if (loading) return '...';
    if (!earthquake || earthquake.distanceKm == null) return 'Bilinmiyor';
    return `${earthquake.distanceKm.toFixed(1)} km`;
  }

  function getNewsTitle() {
    if (loading) return 'Yükleniyor...';
    if (!news) return 'Haber bulunamadı';
    return shortenText(news.title || 'Başlık yok', 100);
  }

  function getNewsSource() {
    if (loading) return '...';
    if (!news) return 'Kaynak yok';
    return news.source || 'Kaynak yok';
  }

  function shortenText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />
      <View style={styles.bgOrb3} />

      <View style={styles.heroCard}>
        <View style={styles.heroBadgeRow}>
          <View style={styles.liveDot} />
          <Text style={styles.liveTxt}>CANLI</Text>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>Bandırma{'\n'}Cepte.</Text>
            <Text style={styles.heroDesc}>
              Hava · Deprem · Haberler
            </Text>
          </View>

          <View style={styles.logoWrap}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View style={styles.sectionLabel}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionLabelText}>CANLI VERİ</Text>
        <View style={styles.sectionLine} />
      </View>

      {/* ÜSTTE YAN YANA: HAVA + DEPREM */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, styles.weatherCard]}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTag}>HAVA DURUMU</Text>
            <Text style={styles.cardTagIcon}>☁️</Text>
          </View>
          <Text style={styles.weatherTemp}>{getWeatherValue()}</Text>
          <View style={styles.cardDivider} />
          <Text style={styles.cardDesc}>{getWeatherDescription()}</Text>
        </View>

        <View style={[styles.summaryCard, styles.quakeCard]}>
          <View style={styles.cardTopRow}>
            <Text style={[styles.cardTag, styles.quakeTag]}>SON DEPREM</Text>
            <Text style={styles.cardTagIcon}>📍</Text>
          </View>
          <View style={styles.magRow}>
            <Text style={styles.magValue}>{getEarthquakeMagnitude()}</Text>
            <Text style={styles.magUnit}>mag</Text>
          </View>
          <View style={[styles.cardDivider, styles.quakeDivider]} />
          <Text style={[styles.cardDesc, styles.quakeDesc]}>
            {getEarthquakeLocation()}
          </Text>
          <Text style={styles.distanceBadge}>📌 {getEarthquakeDistance()}</Text>
        </View>
      </View>

      {/* ALTTA TEK BAŞINA: HABER */}
      <Pressable
        style={[styles.newsWidgetCard]}
        onPress={() => navigation.navigate('News')}
      >
        <View style={styles.cardTopRow}>
          <Text style={[styles.cardTag, styles.newsTag]}>SON HABER</Text>
          <Text style={styles.cardTagIcon}>📰</Text>
        </View>

        <Text style={styles.newsWidgetTitle}>{getNewsTitle()}</Text>

        <View style={[styles.cardDivider, styles.newsDivider]} />

        <Text style={styles.newsWidgetMeta}>{getNewsSource()}</Text>
      </Pressable>

      <View style={styles.sectionLabel}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionLabelText}>MODÜLLER</Text>
        <View style={styles.sectionLine} />
      </View>

      <View style={styles.moduleStack}>
        <Pressable
          style={[styles.moduleCard, { backgroundColor: '#EEF0FF' }]}
          onPress={() => navigation.navigate('Weather')}
        >
          <View style={[styles.moduleIconWrap, { backgroundColor: '#D8DCFF' }]}>
            <Text style={styles.moduleEmoji}>☀️</Text>
          </View>
          <View style={styles.moduleCenter}>
            <Text style={styles.moduleName}>Hava Durumu</Text>
            <Text style={styles.moduleHint}>Sıcaklık, nem, rüzgar</Text>
          </View>
          <View style={styles.moduleArrowWrap}>
            <Text style={styles.moduleArrow}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.moduleCard, { backgroundColor: '#FFEAF8' }]}
          onPress={() => navigation.navigate('Pharmacy')}
        >
          <View style={[styles.moduleIconWrap, { backgroundColor: '#FFCFEF' }]}>
            <Text style={styles.moduleEmoji}>💊</Text>
          </View>
          <View style={styles.moduleCenter}>
            <Text style={styles.moduleName}>Nöbetçi Eczaneler</Text>
            <Text style={styles.moduleHint}>Güncel nöbetçi eczane listesi</Text>
          </View>
          <View style={styles.moduleArrowWrap}>
            <Text style={styles.moduleArrow}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.moduleCard, { backgroundColor: '#E8F4FF' }]}
          onPress={() => navigation.navigate('Bus')}
        >
          <View style={[styles.moduleIconWrap, { backgroundColor: '#CBE7FF' }]}>
            <Text style={styles.moduleEmoji}>🚌</Text>
          </View>
          <View style={styles.moduleCenter}>
            <Text style={styles.moduleName}>Otobüs Saatleri</Text>
            <Text style={styles.moduleHint}>Güncel sefer saatleri</Text>
          </View>
          <View style={styles.moduleArrowWrap}>
            <Text style={styles.moduleArrow}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.moduleCard, { backgroundColor: '#FFF1EE' }]}
          onPress={() => navigation.navigate('Earthquake')}
        >
          <View style={[styles.moduleIconWrap, { backgroundColor: '#FFD9D2' }]}>
            <Text style={styles.moduleEmoji}>📍</Text>
          </View>
          <View style={styles.moduleCenter}>
            <Text style={styles.moduleName}>Son Depremler</Text>
            <Text style={styles.moduleHint}>Çevre bölge kayıtları</Text>
          </View>
          <View style={styles.moduleArrowWrap}>
            <Text style={styles.moduleArrow}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.moduleCard, { backgroundColor: '#EDFCF4' }]}
          onPress={() => navigation.navigate('News')}
        >
          <View style={[styles.moduleIconWrap, { backgroundColor: '#C6F4DB' }]}>
            <Text style={styles.moduleEmoji}>📰</Text>
          </View>
          <View style={styles.moduleCenter}>
            <Text style={styles.moduleName}>Haberler</Text>
            <Text style={styles.moduleHint}>Güncel gelişmeler</Text>
          </View>
          <View style={styles.moduleArrowWrap}>
            <Text style={styles.moduleArrow}>›</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const INDIGO = '#5361FF';
const SLATE = '#0D1424';
const MUTED = '#8898B0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2FA',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 48,
  },

  bgOrb1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: INDIGO,
    opacity: 0.06,
  },
  bgOrb2: {
    position: 'absolute',
    top: 300,
    left: -100,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#FF6B6B',
    opacity: 0.05,
  },
  bgOrb3: {
    position: 'absolute',
    bottom: 60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#00C48C',
    opacity: 0.05,
  },

  heroCard: {
    backgroundColor: SLATE,
    borderRadius: 36,
    padding: 26,
    marginBottom: 26,
    marginTop: 10,
    overflow: 'hidden',
    shadowColor: SLATE,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 14,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 18,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#3DDD87',
  },
  liveTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3DDD87',
    letterSpacing: 1.8,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeft: {
    flex: 1,
    paddingRight: 12,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 44,
    letterSpacing: -1.5,
  },
  heroDesc: {
    marginTop: 10,
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  logoWrap: {
    borderRadius: 26,
    overflow: 'hidden',
  },
  logo: {
    width: 88,
    height: 88,
  },

  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8DDEC',
  },
  sectionLabelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A0ABBE',
    letterSpacing: 2,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 28,
    padding: 20,
    minHeight: 178,
    justifyContent: 'space-between',
  },
  weatherCard: {
    backgroundColor: INDIGO,
    shadowColor: INDIGO,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  quakeCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 5,
  },
  newsWidgetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    minHeight: 130,
    justifyContent: 'space-between',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 5,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTag: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: 'rgba(255,255,255,0.55)',
  },
  quakeTag: {
    color: MUTED,
  },
  newsTag: {
    color: '#5F6B7A',
  },
  cardTagIcon: {
    fontSize: 16,
  },
  weatherTemp: {
    fontSize: 56,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -3,
    lineHeight: 60,
    marginTop: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 10,
  },
  quakeDivider: {
    backgroundColor: '#EEF1F8',
  },
  newsDivider: {
    backgroundColor: '#EEF1F8',
  },
  cardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 17,
    textTransform: 'capitalize',
  },
  quakeDesc: {
    color: '#4A5568',
  },
  magRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  magValue: {
    fontSize: 56,
    fontWeight: '900',
    color: SLATE,
    letterSpacing: -3,
    lineHeight: 60,
  },
  magUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: MUTED,
    marginBottom: 10,
  },
  distanceBadge: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '600',
    color: MUTED,
  },
  newsWidgetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#182033',
    lineHeight: 25,
    marginTop: 8,
  },
  newsWidgetMeta: {
    fontSize: 12,
    color: '#8A92A3',
    fontWeight: '600',
  },

  moduleStack: {
    gap: 12,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  moduleIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleEmoji: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
  },
  moduleCenter: {
    flex: 1,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '800',
    color: SLATE,
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  moduleHint: {
    fontSize: 12,
    color: MUTED,
    fontWeight: '500',
  },
  moduleArrowWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleArrow: {
    fontSize: 20,
    color: '#9AA5BA',
    fontWeight: '600',
    lineHeight: 24,
  },
});