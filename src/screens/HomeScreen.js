import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { getBandirmaWeather } from '../services/weatherService';
import { getEarthquakes } from '../services/earthquakeService';

function ModuleCard({ emoji, name, hint, bgColor, iconBg, onPress, delay = 0 }) {
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 480,
        delay,
        easing: Easing.out(Easing.back(1.6)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 360,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handlePressIn() {
    Animated.parallel([
      Animated.spring(pressScale, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 40,
      }),
      Animated.timing(iconRotate, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handlePressOut() {
    Animated.parallel([
      Animated.spring(pressScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
      Animated.timing(iconRotate, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: true,
      }),
    ]).start();
  }

  const rotate = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-12deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }, { scale: pressScale }],
        opacity: opacityAnim,
      }}
    >
      <Pressable
        style={[styles.moduleCard, { backgroundColor: bgColor }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.moduleIconWrap,
            { backgroundColor: iconBg, transform: [{ rotate }] },
          ]}
        >
          <Text style={styles.moduleEmoji}>{emoji}</Text>
        </Animated.View>

        <View style={styles.moduleCenter}>
          <Text style={styles.moduleName}>{name}</Text>
          <Text style={styles.moduleHint}>{hint}</Text>
        </View>

        <View style={styles.moduleArrowWrap}>
          <Text style={styles.moduleArrow}>›</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ── Animasyonlu Özet Kartı ──
function SummaryCard({ children, style, delay = 0 }) {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

export default function HomeScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [earthquake, setEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hero animasyonları
  const heroSlide = useRef(new Animated.Value(-20)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;
  const logoGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero giriş
    Animated.parallel([
      Animated.timing(heroSlide, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo sürekli pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulse, {
          toValue: 1.04,
          duration: 2000,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
        Animated.timing(logoPulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
      ])
    ).start();


  }, []);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [weatherData, earthquakeData] = await Promise.all([
          getBandirmaWeather(),
          getEarthquakes(),
        ]);
        setWeather(weatherData);
        if (earthquakeData && earthquakeData.length > 0) {
          setEarthquake(earthquakeData[0]);
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

  function shortenText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  const glowOpacity = logoGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Arka plan dekorasyonları */}
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />
      <View style={styles.bgOrb3} />

      {/* ── HERO KART ── */}
      <Animated.View
        style={[
          styles.heroCard,
          {
            transform: [{ translateY: heroSlide }],
            opacity: heroOpacity,
          },
        ]}
      >
        {/* İç dekoratif çizgiler */}
        <View style={styles.heroLine1} />
        <View style={styles.heroLine2} />

        {/* Canlı göstergesi */}
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

          {/* Logo - ortalanmış, pulse animasyonu */}
          <View style={styles.logoContainer}>
            <Animated.View
              style={[
                styles.logoGlow,
                { opacity: glowOpacity },
              ]}
            />
            <Animated.View
              style={[
                styles.logoWrap,
                { transform: [{ scale: logoPulse }] },
              ]}
            >
              <Image
                source={require('../../assets/icon.png')}
                style={styles.logo}
                resizeMode="cover"
              />
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      {/* ── BÖLÜM ETİKETİ ── */}
      <View style={styles.sectionLabel}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionLabelText}>CANLI VERİ</Text>
        <View style={styles.sectionLine} />
      </View>

      {/* ── ÖZET KARTLAR ── */}
      <View style={styles.summaryRow}>
        <SummaryCard style={[styles.summaryCard, styles.weatherCard]} delay={100}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTag}>HAVA DURUMU</Text>
            <Text style={styles.cardTagIcon}>☁️</Text>
          </View>
          <Text style={styles.weatherTemp}>{getWeatherValue()}</Text>
          <View style={styles.cardDivider} />
          <Text style={styles.cardDesc}>{getWeatherDescription()}</Text>
        </SummaryCard>

        <SummaryCard style={[styles.summaryCard, styles.quakeCard]} delay={200}>
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
        </SummaryCard>
      </View>

      {/* ── BÖLÜM ETİKETİ ── */}
      <View style={styles.sectionLabel}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionLabelText}>MODÜLLER</Text>
        <View style={styles.sectionLine} />
      </View>

      {/* ── MODÜLLER ── */}
      <View style={styles.moduleStack}>
        <ModuleCard
          emoji="☀️"
          name="Hava Durumu"
          hint="Sıcaklık, nem, rüzgar"
          bgColor="#EEF0FF"
          iconBg="#D8DCFF"
          onPress={() => navigation.navigate('Weather')}
          delay={120}
        />
        <ModuleCard
          emoji="💊"
          name="Nöbetçi Eczaneler"
          hint="Güncel nöbetçi eczane listesi"
          bgColor="#ffddf7"
          iconBg="#fbbaec"
          onPress={() => navigation.navigate('Pharmacy')}
          delay={120}
        />
        <ModuleCard
          emoji="🚌"
          name="Otobüs Saatleri"
          hint="Güncel otobüs saatleri"
          bgColor="#d4ebff"
          iconBg="#81c3fd"
          onPress={() => navigation.navigate('Bus')}
          delay={120}
        />
        <ModuleCard
          emoji="📍"
          name="Son Depremler"
          hint="Çevre bölge kayıtları"
          bgColor="#FFF1EE"
          iconBg="#FFD9D2"
          onPress={() => navigation.navigate('Earthquake')}
          delay={220}
        />
        <ModuleCard
          emoji="📰"
          name="Haberler"
          hint="Güncel gelişmeler"
          bgColor="#EDFCF4"
          iconBg="#C6F4DB"
          onPress={() => navigation.navigate('News')}
          delay={320}
        />
      </View>
    </ScrollView>
  );
}

// ── RENKLER ──
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

  // BG ORBS
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

  // ── HERO ──
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
  heroLine1: {
    position: 'absolute',
    top: 30,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  heroLine2: {
    position: 'absolute',
    top: 60,
    right: -10,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
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

  // Logo — ortalanmış


  logo: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",

  },

  // ── BÖLÜM ETİKETİ ──
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

  // ── ÖZET KARTLAR ──
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
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

  // ── MODÜLLER ──
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