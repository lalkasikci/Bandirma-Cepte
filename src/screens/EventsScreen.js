import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Linking,
} from "react-native";

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.log("ETKİNLİK HATASI:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Etkinlikler yükleniyor...</Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Etkinlik bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Etkinlikler</Text>
      <Text style={styles.subHeader}>
        Bandırma Belediyesi etkinlik sayfasından alınan güncel etkinlikler
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => Linking.openURL(item.detailUrl)}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>
              Etkinlik detaylarını görüntülemek için resmi sayfaya gidebilirsiniz.
            </Text>

            <Text style={styles.detail}>Detaylı bilgiye git →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4FB",
    padding: 16,
  },
  center: {
    flex: 1,
    backgroundColor: "#F2F4FB",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#475569",
    fontWeight: "600",
  },
  emptyText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0D1424",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 18,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 22,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: "#5361FF",
    fontSize: 11,
    fontWeight: "800",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0D1424",
    lineHeight: 25,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 12,
  },
  detail: {
    color: "#5361FF",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right",
  },
});