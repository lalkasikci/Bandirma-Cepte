import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' }}>
      <Text>Ana Sayfa</Text>

      <Button
        title="Haberler'e Git"
        onPress={() => navigation.navigate('News')}
      />

      <Button
        title="Hava Durumu'na Git"
        onPress={() => navigation.navigate('Weather')}
      />
    </View>
  );
}