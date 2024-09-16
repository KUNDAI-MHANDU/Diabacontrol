import { createStackNavigator } from '@react-navigation/stack';
import Tablayout from './(Tabs)/_layout';
import EducationalVideosScreen from './Screens/EducationalVideosScreen'

const Stack = createStackNavigator();

const MainLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Tablayout">
        <Stack.Screen name='Tablayout' component={Tablayout} options={{headerShown: false}}/>
        <Stack.Screen name='videos' component={EducationalVideosScreen}/>
    </Stack.Navigator>
  )
}

export default MainLayout