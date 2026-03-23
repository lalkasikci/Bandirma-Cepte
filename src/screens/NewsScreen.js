import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function NewsScreen({ navigation }) {
  const news = [
    { id: 1, title: "Bandırma'da kültür etkinliği düzenlendi", content: "Etkinlik detay içeriği burada yer alacak." },
    { id: 2, title: "Bandırma sahilinde yeni düzenleme", content: "Sahil projesiyle ilgili detay içerik burada yer alacak." },
    { id: 3, title: "Üniversitede teknoloji semineri", content: "Seminer hakkında detay içerik burada yer alacak." },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.newsCard}
            onPress={() => navigation.navigate('NewsDetail', { item })}
          >
            <Text style={styles.newsTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f4f7',
  },
  newsCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});