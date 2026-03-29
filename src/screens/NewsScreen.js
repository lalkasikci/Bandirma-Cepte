import { View, Text } from 'react-native';

export default function NewsScreen() {
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
        Haberler Sayfası
      </Text>
    </View>
  );
}