import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen'

const Stack = createStackNavigator();

const SignNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default SignNavigation;
