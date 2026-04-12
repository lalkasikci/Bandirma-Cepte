import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function PharmacyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonIcon}>⌂</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FC',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  homeButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B1F2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  homeButtonIcon: {
    fontSize: 20,
    color: '#182033',
    fontWeight: '800',
  },
  topIconRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  screenIcon: {
    fontSize: 50,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#182033',
    textAlign: 'center',
    marginBottom: 16,
  },
});