import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Fontisto } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { utils, write } from 'xlsx'; 
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useAuth } from '@clerk/clerk-expo'


const Profile = () => {

  const { user } = useUser();
  const [avgGlucose, setAvgGlucose] = useState();
  const { isLoaded, signOut } = useAuth();

useEffect(() => {
  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const data = result.map(req => JSON.parse(req[1]));
      
      // Map the glucose values from each record
      const glucoseValues = data.map(record => parseFloat(record.glucoseLevel));

      // Filter out invalid glucose values (e.g., NaN or null)
      const validGlucoseValues = glucoseValues.filter(val => !isNaN(val) && val !== null);

      // Calculate the average
      const sumGlucose = validGlucoseValues.reduce((acc, val) => acc + val, 0);
      const avg = validGlucoseValues.length > 0 ? sumGlucose / validGlucoseValues.length : 0;

      // Set the average glucose state
      setAvgGlucose(avg.toFixed(2));

    } catch (e) {
      console.log('Failed to load data');
    }
  };
  fetchData();
}, []);

// Manual Base64 encoding without using Buffer
const binaryToBase64 = (binary) => {
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let byteRemainder = binary.length % 3;
  let mainLength = binary.length - byteRemainder;

  // Convert 3 bytes at a time to Base64
  for (let i = 0; i < mainLength; i += 3) {
    const chunk = (binary.charCodeAt(i) << 16) | (binary.charCodeAt(i + 1) << 8) | binary.charCodeAt(i + 2);
    result += base64Chars[(chunk >> 18) & 0x3F] +
              base64Chars[(chunk >> 12) & 0x3F] +
              base64Chars[(chunk >> 6) & 0x3F] +
              base64Chars[chunk & 0x3F];
  }

  // Process remaining bytes
  if (byteRemainder === 1) {
    const chunk = binary.charCodeAt(mainLength) << 16;
    result += base64Chars[(chunk >> 18) & 0x3F] +
              base64Chars[(chunk >> 12) & 0x3F] +
              '==';
  } else if (byteRemainder === 2) {
    const chunk = (binary.charCodeAt(mainLength) << 16) | (binary.charCodeAt(mainLength + 1) << 8);
    result += base64Chars[(chunk >> 18) & 0x3F] +
              base64Chars[(chunk >> 12) & 0x3F] +
              base64Chars[(chunk >> 6) & 0x3F] +
              '=';
  }

  return result;
};

const expoData = async () => {

  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const data = result.map(req => JSON.parse(req[1]));

    const header = [['Date', 'Carbohydrate Count', 'Insulin Dose', 'Glucose Level']];
    const csvData = data.map(item => 
      [item.date, item.carbCount, item.insulinDose, item.glucoseLevel]
    );

    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(header);
    utils.sheet_add_json(ws, csvData, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');

    const wbout = write(wb, { bookType: 'xlsx', type: 'binary' });

    const base64Data = binaryToBase64(wbout);

    const fileUri = `${FileSystem.documentDirectory}Report.xlsx`;

    await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Error', 'Sharing is not available on this platform');
      return;
    }

    await Sharing.shareAsync(fileUri);

  } catch (error) {
    console.error('Error exporting data:', error);
    Alert.alert('Error', 'Failed to export data');
  }
};

const SignOut = async () => {
  if (!isLoaded) {
    return
  }

  try {
    await signOut()
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
  }
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}></View>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.profilePic}
        />
        <Text style={styles.userName}>{user?.fullName}</Text>
      </View>
      <View style={{padding: 20, marginBottom: 20}}>
        <Text style={{marginBottom: 20, fontWeight: 'bold', color: 'grey'}}>Personal Details</Text>
        <View style={styles.personalInfoTop}>
          <View style={styles.email}>
            <Fontisto name="email" size={24} color="orange" />
            <Text style={{color: 'grey'}}>Email:</Text>
          </View>
          {/* Assuming emailAddresses is an array */}
          <Text style={{marginRight: 10}}>{user?.emailAddresses[0]?.emailAddress}</Text>
        </View>
        <View style={styles.personalInfoBottom}>
          <View style={styles.email}>
            <MaterialCommunityIcons name="spoon-sugar" size={24} color="orange" />
            <Text style={{color: 'grey'}}>Avg Glucose (mg/dl):</Text>
          </View>
          <Text style={{marginRight: 10}}>{avgGlucose}</Text>
        </View>
      </View>
      <View style={{padding: 20, marginBottom: 20}}>
        <Text style={{marginBottom: 20, fontWeight: 'bold', color: 'grey'}}>Utilities</Text>
        <TouchableOpacity style={styles.personalInfoTop} onPress={expoData}>
          <View style={styles.email}>
            <AntDesign name="clouddownload" size={24} color="orange" />
            <Text style={{color: 'grey'}}>Export Data</Text>
          </View>
          <Text style={{fontSize: 20, color: 'grey', marginRight: 10}}>{">"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.personalInfoBottom} onPress={signOut}>
          <View style={styles.email}>
            <Entypo name="log-out" size={24} color="orange" />
            <Text style={{color: 'grey'}}>Sign Out</Text>
          </View>
          <Text style={{fontSize: 20, color: 'grey', marginRight: 10}}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topSection: {
    height: 255, 
    backgroundColor: 'orange',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -50, 
    marginBottom: 20, 
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4, 
    borderColor: '#fff', 
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10, 
  },
  personalInfoTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 60,
    alignItems: 'center',
    marginBottom: 4,

  },
  personalInfoBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    height: 60,
    alignItems: 'center',

  },
  email: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 10
  },
});

export default Profile;
