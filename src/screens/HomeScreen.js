import { View, Text, StyleSheet } from 'react-native';
import CardItem from '../components/CardItem';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bandırma Cepte</Text>
      <Text style={styles.subtitle}>Şehir bilgilerine hızlı erişim</Text>

      <CardItem
        title="Haberler"
        onPress={() => navigation.navigate('News')}
      />

      <CardItem
        title="Hava Durumu"
        onPress={() => navigation.navigate('Weather')}
      />

      <CardItem
        title="Depremler"
        onPress={() => navigation.navigate('Earthquake')}
      />
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
  },
});