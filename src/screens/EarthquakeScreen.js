import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function EarthquakeScreen() {
  const earthquakes = [
    { id: '1', place: 'Balıkesir - Bandırma Yakını', magnitude: 2.8, time: 'Bugün 14:20' },
    { id: '2', place: 'Bursa - Gemlik', magnitude: 3.4, time: 'Bugün 11:05' },
    { id: '3', place: 'Çanakkale', magnitude: 2.6, time: 'Dün 22:40' },
    { id: '4', place: 'İzmir', magnitude: 4.1, time: 'Dün 18:15' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Son Depremler</Text>
      <Text style={styles.subtitle}>Yakın zamanda kaydedilen bazı depremler</Text>

      <FlatList
        data={earthquakes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.place}>{item.place}</Text>
              <Text style={styles.mag}>M {item.magnitude}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E2A3A',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 14,
    color: '#69748C',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  place: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A3A',
  },
  mag: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D64545',
  },
  time: {
    marginTop: 8,
    fontSize: 13,
    color: '#69748C',
  },
});