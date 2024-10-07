import { createStackNavigator } from '@react-navigation/stack';
import Screen_1 from './screen_1';
import Screen_2 from './Screen_2';
import Screen_3 from './Screen_3';
import Screen_4 from './Screen_4';

const Stack = createStackNavigator();

const OnBoardingNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Screen1">
      <Stack.Screen name="screen1" component={Screen_1} options={{headerShown: false}}/>
      <Stack.Screen name="screen2" component={Screen_2} options={{headerShown: false}}/>
      <Stack.Screen name="screen3" component={Screen_3} options={{headerShown: false}}/>
      <Stack.Screen name="screen4" component={Screen_4} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default OnBoardingNavigation;
