import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import YouTubeIframe from 'react-native-youtube-iframe';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Sample = () => {

  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();

  useEffect(() => {
      GetVideo();
  }, []);

  const GetVideo = async () => {
      setLoading(true); // Start loading
      const q = query(collection(db, 'sample'));
      const querySnapShot = await getDocs(q);

      let videoData = [];
      querySnapShot.forEach((doc) => {
          console.log(doc.data());
          videoData.push(doc.data());
      });
      setVideoList(videoData);
      setLoading(false); 
  };

  if (loading) {
    // Show loading indicator while fetching data
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 250,}}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={videoList}
        horizontal={true}
        style={{
          paddingLeft: 20
        }}
        renderItem={({ item }) => (
          <View style={{
            width: 300,
            height: 250,
            borderRadius: 15,
            marginRight: 20,
            marginBottom: 20,
            backgroundColor: '#fff',
            padding: 20,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.25, 
            shadowRadius: 3.84, 
            elevation: 5, 
          }}>
            <YouTubeIframe
              height={160}
              play={false}
              videoId={item.videoID}
            />
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Sample;
