import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from 'react-native';

export default function NewsDetailScreen({ route, navigation }) {
  const { item } = route.params;

  async function openOriginalLink() {
    if (!item.link) return;

    const supported = await Linking.canOpenURL(item.link);
    if (supported) {
      await Linking.openURL(item.link);
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'Tarih yok';

    const date = new Date(dateString);

    if (isNaN(date)) return 'Tarih yok';

    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonIcon}>←</Text>
        </Pressable>
      </View>

      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>{item.source || 'Kaynak yok'}</Text>
        <Text style={styles.meta}>{formatDate(item.publishedAt)}</Text>
      </View>

      <Text style={styles.summary}>
        {item.summary || 'Detay bilgisi bulunamadı.'}
      </Text>

      <Pressable style={styles.linkButton} onPress={openOriginalLink}>
        <Text style={styles.linkButtonText}>Haberi Kaynağında Aç</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FC',
  },
  content: {
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
  },
  backButton: {
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
  backButtonIcon: {
    fontSize: 20,
    color: '#182033',
    fontWeight: '800',
  },
  image: {
    width: '100%',
    height: 230,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#182033',
    lineHeight: 32,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 18,
  },
  meta: {
    fontSize: 12,
    color: '#8A92A3',
    flexShrink: 1,
  },
  summary: {
    fontSize: 16,
    lineHeight: 25,
    color: '#4A5568',
    paddingHorizontal: 20,
  },
  linkButton: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#5B6EF5',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});