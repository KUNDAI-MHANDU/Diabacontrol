import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './home';
import FoodScanner from './foodScanner';
import Profile from './profile';
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();

const Tablayout = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false); 
      }, 5000); 
    }, []);
  
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={{height: '60%', width: '100%', borderRadius: 360, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <View style={{height: 300, width: "100%", justifyContent: 'center', alignItems:'center'}}>
              <LottieView source={require("../../assets/Animation - 1728111823849.json")}
                style={{width: "100%", height: "100%"}}
                autoPlay
                loop
              />
          </View>
          <Text style={styles.loadingText}>DiabaControl</Text>
          </View>
        </View>
      );
    }

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
};

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      padding: 20,
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'orange',
    },
    loadingText: {
      fontSize: 30,
      color: 'orange',
      fontWeight: 'bold'
    },
    recommendationContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recommendationTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    seeAll: {
      color: 'orange',
      fontSize: 12,
    },
  });

export default Tablayout