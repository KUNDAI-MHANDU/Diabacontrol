import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Rating, Button } from 'react-native-elements';
import { Video } from 'expo-av';

const FirstAidImage = require('../../assets/FirstAid.png');
const HypogSymImage = require('../../assets/HypoglycemiaSymptoms.png');
const GlucoseTestImage = require('../../assets/GlucoseTest.png');
const SugarLevelImage = require('../../assets/checkBloodSugarLevel.jpg');

const categories = [
  {
    id: 1,
    title: 'Hypoglycemia',
    image: FirstAidImage,
    videos: [
      {
        id: 1,
        title: 'First AID in hypoglycemic coma.',
        image: FirstAidImage,
        video: 'https://youtu.be/CJhLXBTp300?si=PWvcpGwNzIYANXTh',
        review: "**First Aid for Hypoglycemic Coma:**\n\n1. **Call for Help**: Immediately contact emergency services for professional assistance.\n2. **Check Responsiveness**: If the person is unconscious, do not attempt to give anything by mouth.\n3. **Administer Glucagon**: If prescribed, inject glucagon according to the instructions. It helps raise blood sugar levels.\n4. **Monitor**: Keep track of their condition until help arrives. If they regain consciousness, provide a source of glucose like fruit juice or glucose tablets if they can safely consume it.\n\nPrompt action is crucial for managing a hypoglycemic coma and preventing serious complications."
},
      {
        id: 2,
        title: 'Best food for treating low blood sugar',
        image: HypogSymImage,
        video: 'https://youtu.be/CJhLXBTp300?si=PWvcpGwNzIYANXTh',
        review: "**Best Food for Treating Low Blood Sugar:**\n\n1. **Glucose Tablets**: Quickly raise blood sugar levels and are easily portable.\n2. **Fruit Juice**: A small glass provides a rapid sugar boost.\n3. **Honey**: A tablespoon offers a quick glucose fix.\n4. **Regular Soda**: Helps quickly elevate blood sugar, but avoid diet versions.\n5. **Raisins**: A small handful can effectively raise blood sugar.\n\nThese foods offer fast relief from low blood sugar and help stabilize levels."
},
    ],
  },
  {
    id: 2,
    title: 'Glucose',
    image: GlucoseTestImage,
    videos: [
      {
        id: 3,
        title: 'How to do a blood glucose test',
        image: GlucoseTestImage,
        video: 'https://youtu.be/CJhLXBTp300?si=PWvcpGwNzIYANXTh',
        review: "**How to Do a Blood Glucose Test:**\n\n1. **Wash Your Hands**: Clean with soap and water to avoid contamination.\n2. **Prepare the Glucometer**: Insert a test strip into the meter.\n3. **Prick Your Finger**: Use a lancet to obtain a small blood sample.\n4. **Apply Blood to Test Strip**: Place the blood on the test strip as directed.\n5. **Read Results**: Check the meter’s display for your blood glucose level.\n\nRegular testing helps manage blood sugar effectively and ensures proper diabetes control."
},
      {
        id: 4,
        title: 'Right Time To Check Blood Sugar Level',
        image: SugarLevelImage,
        video: 'https://youtu.be/CJhLXBTp300?si=PWvcpGwNzIYANXTh',
        review: "Checking your blood sugar at the right times is key for managing diabetes:\n\n1. **Morning (Fasting)**: Provides a baseline for overnight glucose levels.\n2. **Before Meals**: Helps adjust insulin or medication before eating.\n3. **2 Hours After Meals**: Evaluates how your body handles post-meal glucose spikes.\n4. **Before and After Exercise**: Ensures safety and monitors exercise impact on blood sugar.\n5. **Before Bed**: Checks for stability to avoid nighttime fluctuations.\n\nRegular monitoring helps manage blood sugar effectively."
      },
    ],
  },
];

const EducationalVideosScreen = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const renderVideoList = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Educational Videos</Text>
      {categories.map(category => (
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {category.videos.map(video => (
              <TouchableOpacity key={video.id} onPress={() => setSelectedVideo(video)}>
                <Card containerStyle={styles.card}>
                  <Image source={video.image} style={styles.image} />
                  <Card.Title style={styles.cardTitle}>{video.title}</Card.Title>
                  <Rating imageSize={20} readonly startingValue={4.5} />
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );

  const renderVideoPlayer = () => (
    <View style={styles.videoContainer}>
      <Card containerStyle={styles.card}>
        <Video
          source={{ uri: selectedVideo.video }}
          useNativeControls
          resizeMode="contain"
          style={styles.video}
        />
        <Text style={styles.title}>{selectedVideo.title}</Text>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>{selectedVideo.review}</Text>
        </ScrollView>
        <Button title="Back to Videos" onPress={() => setSelectedVideo(null)} buttonStyle={styles.backButton} />
      </Card>
    </View>
  );

  return selectedVideo ? renderVideoPlayer() : renderVideoList();
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FBE2A9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#C64304',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#F5BE71',
    padding: 10,
    borderRadius: 5,
    color: '#B26F18',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    flexDirection: 'row',
  },
  card: {
    width: 300,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#F16B05',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#F16B05',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#FBE2A9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  video: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F16B05',
    marginVertical: 10,
    textAlign: 'center',
  },
  descriptionContainer: {
    maxHeight: 150,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#F16B05',
    marginTop: 10,
  },
});

export default EducationalVideosScreen;    