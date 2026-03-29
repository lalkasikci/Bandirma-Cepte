import { View, Text, Pressable, StyleSheet, Image, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />

        <View style={styles.heroTextArea}>
          <Text style={styles.title}>Bandırma Cepte</Text>
          <Text style={styles.subtitle}>Şehir bilgileri tek yerde</Text>
          <Text style={styles.description}>
            Hava durumu, son depremler ve yerel içeriklere tek ekrandan hızlı eriş.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Hızlı Bakış</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Hava</Text>
          <Text style={styles.summaryValue}>24°C</Text>
          <Text style={styles.summarySmall}>Parçalı bulutlu</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Son Deprem</Text>
          <Text style={styles.summaryValue}>2.8</Text>
          <Text style={styles.summarySmall}>Bandırma Yakını</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Modüller</Text>

      <View style={styles.cardContainer}>
        <Pressable
          style={[styles.card, styles.weatherCard]}
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.cardTitle}>🌤️ Hava Durumu</Text>
          <Text style={styles.cardDesc}>
            Güncel sıcaklık, nem ve rüzgar bilgileri
          </Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.earthquakeCard]}
          onPress={() => navigation.navigate('Earthquake')}
        >
          <Text style={styles.cardTitle}>📍 Son Depremler</Text>
          <Text style={styles.cardDesc}>
            Son depremleri ve temel bilgilerini görüntüle
          </Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.newsCard]}
          onPress={() => navigation.navigate('News')}
        >
          <Text style={styles.cardTitle}>📰 Haberler</Text>
          <Text style={styles.cardDesc}>
            Bandırma ile ilgili son gelişmeler
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroTextArea: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E2A3A',
  },
  subtitle: {
    fontSize: 15,
    color: '#69748C',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#556070',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E2A3A',
    marginBottom: 12,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#69748C',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E2A3A',
  },
  summarySmall: {
    marginTop: 6,
    fontSize: 13,
    color: '#69748C',
  },
  cardContainer: {
    gap: 14,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },
  weatherCard: {
    backgroundColor: '#EAF2FF',
  },
  earthquakeCard: {
    backgroundColor: '#FFF1F1',
  },
  newsCard: {
    backgroundColor: '#F2F4F7',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E2A3A',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#5F6B7A',
    lineHeight: 20,
  },
});