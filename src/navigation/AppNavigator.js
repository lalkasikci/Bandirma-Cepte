import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import WeatherScreen from '../screens/WeatherScreen';
import EarthquakeScreen from '../screens/EarthquakeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Bandırma Cepte' }} />
        <Stack.Screen name="News" component={NewsScreen} options={{ title: 'Haberler' }} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'Hava Durumu' }} />
        <Stack.Screen name="Earthquake" component={EarthquakeScreen} options={{ title: 'Son Depremler' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}