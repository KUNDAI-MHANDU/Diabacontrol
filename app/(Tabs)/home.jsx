import { View, ScrollView, Text, Pressable, StyleSheet, } from 'react-native';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import Features from '../../components/Features';
import Sample from '../../components/Sample';


const Home = () => {

  return (
    <ScrollView style={{ color: '#DCDCDC' }}>
      <Header />
      <Text style={styles.title}>#Offers for you</Text>
      <Slider />
      <Features />
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>Top Recommendation</Text>
        <Pressable onPress={() => navigation.navigate('videos')}>
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>
      <Sample />
    </ScrollView>
  );
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

export default Home;
