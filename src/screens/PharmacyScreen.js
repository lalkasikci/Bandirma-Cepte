import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { pharmacies } from '../data/pharmacies';

export default function PharmacyScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonIcon}>⌂</Text>
      </Pressable>

      <Text style={styles.pageTitle}>Nöbetçi Eczaneler</Text>
      <Text style={styles.subtitle}>Bugün açık olan eczaneler</Text>

      {pharmacies.map((pharmacy) => (
        <View key={pharmacy.id} style={styles.card}>
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>

          <Text style={styles.label}>Adres:</Text>
          <Text style={styles.info}>{pharmacy.address}</Text>

          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.phone}>{pharmacy.phone}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FC',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  homeButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    elevation: 4,
    alignSelf: 'center',
  },
  homeButtonIcon: {
    fontSize: 20,
    fontWeight: '800',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8898B0',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  phone: {
    fontSize: 15,
    fontWeight: '700',
    color: '#007BFF',
    marginTop: 4,
  },
});