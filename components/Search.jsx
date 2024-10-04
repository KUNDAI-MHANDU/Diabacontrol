import { View, Text, FlatList, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import YouTubeIframe from 'react-native-youtube-iframe';
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Search = () => {

    const [videoList, setVideoList] = useState([]);
    const [filteredVideoList, setFilteredVideoList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');  // New state for search query
  
    useEffect(() => {
        GetVideo();
    }, [])
  
    useEffect(() => {
      // Filter the video list whenever searchQuery changes
      const filteredData = videoList.filter(video => 
        video.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideoList(filteredData);
    }, [searchQuery, videoList]);
  
    const GetVideo = async () => {
        setVideoList([]);
        const q = query(collection(db, 'sample'));
        const querySnapShot = await getDocs(q);
  
        let videoData = [];
        querySnapShot.forEach((doc) => {
            videoData.push(doc.data());
        });
        setVideoList(videoData);
    }

  return (
    <View>
              <View style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 7,
        alignItems: 'center',
        marginVertical: 10,
        gap: 10,
        borderRadius: 8,
        marginTop: 10
      }}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput 
            placeholder='Search'
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
          <FlatList
        data={filteredVideoList}  // Use filtered list instead of videoList
        horizontal={true}
        style={{ paddingLeft: 20 }}
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

export default Search