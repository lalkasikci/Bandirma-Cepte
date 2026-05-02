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
        <Text>Etkinlikler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Etkinlikler</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => Linking.openURL(item.detailUrl)}
          >
            <View style={styles.topRow}>
              <Text style={styles.badge}>{item.category}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.infoBox}>
              <Text style={styles.info}>📅 {item.date}</Text>
              <Text style={styles.info}>🕒 {item.time}</Text>
            </View>

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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 18,
    color: "#0D1424",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#EDE9FE",
    color: "#5361FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0D1424",
    marginBottom: 12,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 14,
    gap: 6,
  },
  info: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
  },
  detail: {
    marginTop: 12,
    color: "#5361FF",
    fontWeight: "800",
    textAlign: "right",
  },
});