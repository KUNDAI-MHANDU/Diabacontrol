import React, { useEffect, useState, } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Timestamp } from 'firebase/firestore';


const Tip = () => {

    const [tipsList, setTipsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const img = require('../../assets/istockphoto.jpg') 

    useEffect(() => {
        GetTips()
        const q = query(collection(db, 'tips'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tipsData = [];
            querySnapshot.forEach((doc) => {
                tipsData.push(doc.data());
            });
    
            // Add time-based filtering as in the previous step
            const currentHour = new Date().getHours();
            let filteredTips;
            if (currentHour >= 6 && currentHour < 12) {
                filteredTips = tipsData.filter(tip => tip.type === 'morning');
            } else if (currentHour >= 12 && currentHour < 18) {
                filteredTips = tipsData.filter(tip => tip.type === 'daytime');
            } else {
                filteredTips = tipsData.filter(tip => tip.type === 'night');
            }
    
            setTipsList(filteredTips);
            setLoading(false);
        });
    
        return () => unsubscribe(); // Cleanup on unmount
    }, []);
    

    const GetTips = async () => {
        const q = query(collection(db, 'tips'));
        const querySnapShot = await getDocs(q);
    
        let tipsData = [];
        querySnapShot.forEach((doc) => {
            tipsData.push(doc.data());
        });
    
        const currentHour = new Date().getHours(); // Get the current hour (0-23)
    
        let filteredTips;
        if (currentHour >= 6 && currentHour < 12) {
            // Morning tip
            filteredTips = tipsData.filter(tip => tip.type === 'morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            // Daytime tip
            filteredTips = tipsData.filter(tip => tip.type === 'daytime');
        } else {
            // Night tip
            filteredTips = tipsData.filter(tip => tip.type === 'night');
        }
    
        setTipsList(filteredTips);
        setLoading(false);
    };
    

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 160,}}>
            <ActivityIndicator size="large" color="orange" />
            <Text>Loading...</Text>
          </View>
        );
      }

  return (
    <View style={{flex: 1, padding: 5}}>
        <Image 
            source={img}
            style={{height: 250, width: "100%", marginBottom: 20}}
        />
        <Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Welcome To Tips For diabetes</Text>
        <Text style={{
            marginBottom: 10
        }}>The "Tips for Sugar Diabetes" page will display three daily tips to help users manage their diabetes:

Morning Tip: Shown in the morning to motivate users to start their day with a helpful diabetes management tip (e.g., a reminder to check blood sugar levels or to plan healthy meals).

Daytime Tip: Displayed around midday, focusing on staying hydrated, tracking carbohydrate intake, or taking insulin as prescribed.

Night Tip: Provided in the evening to guide users in preparing for bedtime, such as checking blood glucose before sleep or managing late-night snacks.

The tips will change every day, offering new advice to users at regular intervals throughout the day (morning, midday, and night). The system could use a real-time database or schedule these tips to appear based on the user's local time, ensuring they receive relevant tips at the right time of day.</Text>
<View style={styles.separator} />
<Text style={{
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10
}}>Tips For the Day</Text>
<FlatList
        data={tipsList}
        renderItem={({ item }) => (
          <View>
            <View st>
                <Text style={{
                    fontSize: 14,
                    marginBottom: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: 10
                }}>Tip {item.number}: {item.timestamp.toDate().toLocaleString()}</Text>
            </View>
            <Text style={{textAlign: 'center'}}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
};

const styles = StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginVertical: 10,
    },
  });

export default Tip