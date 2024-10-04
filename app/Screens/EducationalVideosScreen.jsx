import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import YouTubeIframe from 'react-native-youtube-iframe';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const EducationalVideosScreen = () => {

  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    GetVideo();
  }, []);

  const GetVideo = async () => {
    setVideoList([]);
    const q = query(collection(db, 'Videos'));
    const querySnapShot = await getDocs(q);

    let videoData = [];
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      videoData.push(doc.data());
    });
    setVideoList(videoData);
  };

  return (
    <View>
      <View style={{ padding: 20, justifyContent: 'center' }}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput placeholder="Search" />
        </View>
      </View>

      <FlatList
        data={videoList}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <YouTubeIframe
              height={240}
              play={false}
              videoId={item.videoID}
            />
            <Text style={styles.videoTitle}>{item.name}</Text>
            {/* Add a horizontal line here */}
            <View style={styles.separator} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 7,
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  videoContainer: {
    width: '100%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoTitle: {
    textAlign: 'center',
    marginTop: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
});

export default EducationalVideosScreen;
