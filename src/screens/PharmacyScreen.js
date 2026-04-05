import { View, Text } from 'react-native';

export default function PharmacyScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: '700' }}>
        Nöbetçi Eczaneler Sayfası
      </Text>
    </View>
  );
}