import { View, Text, Pressable, StyleSheet, ScrollView, Linking } from 'react-native';
import { emergencyNumbers } from '../data/emergencyNumbers';

export default function EmergencyNumbersScreen({ navigation }) {
  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonIcon}>⌂</Text>
      </Pressable>

      <Text style={styles.pageTitle}>Acil Numaralar</Text>
      <Text style={styles.subtitle}>Bandırma ve Türkiye genelinde önemli acil hatlar</Text>

      {emergencyNumbers.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <Pressable style={styles.callButton} onPress={() => callNumber(item.number)}>
            <Text style={styles.callText}>{item.number}</Text>
          </Pressable>
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
    color: '#182033',
    fontWeight: '800',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#182033',
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
    marginBottom: 14,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#182033',
  },
  description: {
    fontSize: 13,
    color: '#8898B0',
    marginTop: 5,
    maxWidth: 220,
  },
  callButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  callText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});