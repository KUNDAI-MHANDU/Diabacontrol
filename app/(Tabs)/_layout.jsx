import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './home';
import FoodScanner from './foodScanner';
import Profile from './profile';

const Tab = createBottomTabNavigator();

const Tablayout = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name='home' component={Home} options={{
            tabBarLabel:'Home',
            tabBarIcon:({color})=><FontAwesome name="home" size={24} color={color} />
        }}/>
        <Tab.Screen name='foodScanner' component={FoodScanner} options={{
            tabBarLabel:'Scan',
            tabBarIcon:({color})=><MaterialCommunityIcons name="line-scan" size={24} color={color} />
        }}/>
        <Tab.Screen name='profile' component={Profile} options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color})=><Ionicons name="person-circle-outline" size={24} color={color} />
        }}/>
    </Tab.Navigator>
  )
}

export default Tablayout