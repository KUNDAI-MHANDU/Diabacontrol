import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';  
import { collection, onSnapshot } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Header = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [newTipAvailable, setNewTipAvailable] = useState(false); 
  const navigation = useNavigation();


  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      navigation.navigate('SearchResults', { searchQuery }); 
    }
  };

  useEffect(() => {
    const tipsCollectionRef = collection(db, 'tips'); 

  
    const unsubscribe = onSnapshot(tipsCollectionRef, async (snapshot) => {
      if (!snapshot.empty) {
       
        const recentTip = snapshot.docs[snapshot.docs.length - 1].data();

        const recentTipTimestamp = recentTip.timestamp?.toDate().getTime(); 
        
        const lastViewedTipTime = await AsyncStorage.getItem('lastViewedTipTime'); 

        if (!lastViewedTipTime || recentTipTimestamp > lastViewedTipTime) {
          setNewTipAvailable(true); 
        }
      }
    });

    return () => unsubscribe();
  }, []);

  
  const handleNotificationPress = async () => {
    setNewTipAvailable(false); 

    const currentTime = new Date().getTime();
    await AsyncStorage.setItem('lastViewedTipTime', currentTime.toString());

    navigation.navigate('tips'); 
  };

  return (
    <View style={{ padding: 20, paddingTop: 40, backgroundColor: 'orange', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ display: "flex", flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Image style={{ width: 45, height: 45, borderRadius: 99 }} source={{ uri: user?.imageUrl }} />
          <View>
            <Text style={{ color: 'white' }}>Welcome</Text>
            <Text style={{ fontSize: 19, color: 'white' }}>{user?.fullName}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleNotificationPress} style={{ position: 'relative' }}>
          <Ionicons name="notifications-sharp" size={24} color="white" />
          {newTipAvailable && (
            <View style={styles.notificationDot} />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', padding: 7, alignItems: 'center', marginVertical: 10, gap: 10, borderRadius: 8, marginTop: 10 }}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          placeholder='Search'
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}  
          returnKeyType="search"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationDot: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 10,
    height: 10,
  },
});

export default Header;
