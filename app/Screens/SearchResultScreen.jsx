import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import YouTubeIframe from 'react-native-youtube-iframe';

const SearchResultScreen = ({ route }) => {
  const { searchQuery } = route.params;  // Get the search query from route
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    GetFilteredVideos(searchQuery);
  }, [searchQuery]);

  // Fetch and filter video list based on search query
  const GetFilteredVideos = async (queryText) => {
    const q = query(collection(db, 'Videos'));
    const querySnapShot = await getDocs(q);

    let videoData = [];
    querySnapShot.forEach((doc) => {
      videoData.push(doc.data());
    });

    const filtered = videoData.filter(video => 
      video.name.toLowerCase().includes(queryText.toLowerCase())  // Filter based on query
    );
    setFilteredVideos(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results for "{searchQuery}"</Text>
      <FlatList
        data={filteredVideos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <YouTubeIframe
              height={240}
              play={false}
              videoId={item.videoID}
            />
            <Text style={styles.videoTitle}>{item.name}</Text>
            <View style={styles.separator} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default SearchResultScreen;
