import { createStackNavigator } from '@react-navigation/stack';
import Tablayout from './(Tabs)/_layout';
import EducationalVideosScreen from './Screens/EducationalVideosScreen';
import InsulinCalculator from './Screens/Calculator';
import RecordDataScreen from './Screens/Records';
import ReportScreen from './Screens/Reports';
import CommuniteChatScreen from './Screens/CommunityChat';
import AiChat from './Screens/AIChat';
import SearchResultScreen from './Screens/SearchResultScreen';

const Stack = createStackNavigator();

const MainLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Tablayout">
        <Stack.Screen name='Tablayout' component={Tablayout} options={{headerShown: false}}/>
        <Stack.Screen name="SearchResults" component={SearchResultScreen} />
        <Stack.Screen name='videos' component={EducationalVideosScreen}/>
        <Stack.Screen name='calculator' component={InsulinCalculator}/>
        <Stack.Screen name='records' component={RecordDataScreen}/>
        <Stack.Screen name='reports' component={ReportScreen}/>
        <Stack.Screen name='communite_chat' component={CommuniteChatScreen}/>
        <Stack.Screen name='Diaba_Intelligence' component={AiChat}/>
    </Stack.Navigator>
  )
}

export default MainLayout