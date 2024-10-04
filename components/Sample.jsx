import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import YouTubeIframe from 'react-native-youtube-iframe';
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'
import { useNavigation } from '@react-navigation/native';

const Sample = () => {

  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
      GetVideo();
  }, [])

  const GetVideo = async () => {
      setVideoList([]);
      const q = query(collection(db, 'sample'));
      const querySnapShot = await getDocs(q);

      let videoData = [];
      querySnapShot.forEach((doc) => {
          console.log(doc.data());
          videoData.push(doc.data());
      });
      setVideoList(videoData);
  }

  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>Top Recommendation</Text>
        <Pressable onPress={() => navigation.navigate('videos')}>
          <Text style={{
            color: 'orange',
            fontSize: 12,
          }}>See All</Text>
        </Pressable>
      </View>
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
  )
}

export default Sample