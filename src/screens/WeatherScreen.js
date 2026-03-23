import { View, Text, StyleSheet } from 'react-native';

export default function WeatherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hava Durumu</Text>
      <Text style={styles.text}>Bandırma için hava durumu bilgileri burada gösterilecek.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
  },
});