import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen'
import OnBoardingNavigation from '../OnBoardingScreens/_layout';

const Stack = createStackNavigator();

const SignNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="onBoardingScreens">
      <Stack.Screen name="onBoardingScreens" component={OnBoardingNavigation} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default SignNavigation;
