import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { busLines } from '../data/busTimes';

export default function BusTimeScreen({ navigation }) {
  const today = new Date().getDay();

  const getTodayType = () => {
    if (today === 0) return 'sunday';
    if (today === 6) return 'saturday';
    return 'weekday';
  };

  const todayType = getTodayType();

  const getNextBus = (times) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return times.find((time) => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute > currentMinutes;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonIcon}>⌂</Text>
      </Pressable>

      <Text style={styles.pageTitle}>Otobüs Saatleri</Text>
      <Text style={styles.subtitle}>Bandırma şehir içi otobüs hatları</Text>

      {busLines.map((line) => {
        const times = line[todayType];
        const nextBus = getNextBus(times);

        return (
          <View key={line.id} style={styles.card}>
            <Text style={styles.lineName}>{line.name}</Text>
            <Text style={styles.route}>{line.route}</Text>

            <Text style={styles.nextBus}>
              Sonraki Otobüs: {nextBus || 'Bugün başka sefer yok'}
            </Text>

            <View style={styles.timeContainer}>
              {times.map((time, index) => (
            <View
              key={index}
              style={[
                styles.timeBox,
                time === nextBus && styles.nextTimeBox
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  time === nextBus && styles.nextTimeText
                ]}
              >
                {time}
              </Text>
            </View>
))}
            </View>
          </View>
        );
      })}
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
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    elevation: 4,
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
    marginBottom: 16,
    elevation: 3,
  },
  lineName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#182033',
  },
  route: {
    fontSize: 13,
    color: '#8898B0',
    marginTop: 4,
    marginBottom: 12,
  },
  nextBus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5361FF',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeBox: {
    backgroundColor: '#E8F4FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#182033',
  },
  nextTimeBox: {
  backgroundColor: '#007BFF',
},

nextTimeText: {
  color: '#FFFFFF',
},
});