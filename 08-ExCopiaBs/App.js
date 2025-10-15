import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Buildstrap} from 'react-native-buildstrap'
import HomeScreen from './Screens/HomeScreen';
import { enableScreens } from 'react-native-screens';
import { dark, light } from './Themes/Themes';
import { SensorDHTScreen } from './Screens/SensorDHTScreen';

enableScreens();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
<Buildstrap customThemes={{dark, light}}>
  <NavigationContainer>
<Tab.Navigator screenOptions={{headerShown:false}}>
  <Tab.Screen name='Home' component={HomeScreen}/>
  <Tab.Screen name='sensor' component={SensorDHTScreen}/>
</Tab.Navigator>
  </NavigationContainer>
</Buildstrap>
  );
}
