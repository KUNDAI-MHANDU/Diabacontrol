import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const Screen_2 = () => {

    const navigation = useNavigation();
  // Step 1: Set up the animated value for slide-down effect
  const slideAnim = useRef(new Animated.Value(-100)).current;  // Start above the screen

  // Step 2: Use useEffect to trigger the animation when the component mounts
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,  // Move down to its original position (y = 0)
      duration: 1000,  // Animation duration in milliseconds
      useNativeDriver: true,  // Use native driver for smoother performance
    }).start();
  }, []);

  return (
    <View style={styles.Container}>
        <Animated.View style={[styles.textContainer, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.lottieWrapper}>
        <LottieView
          source={require('../../assets/Animation - 1728115990757.json')}
          style={{ width: '100%', height: '100%' }}
          autoPlay
          loop
        />
      </View>

      {/* Step 3: Use Animated.View for sliding-down animation */}
        <Text style={styles.title}>Master Your Diabetes with Ease</Text>
        <Text style={styles.description}>
          Take control of your blood glucose levels, meal planning, and insulin doses—all in one app. Diabacontrol empowers you to manage diabetes with confidence.
        </Text>
      </Animated.View>

      <Pressable style={styles.button} onPress={() => navigation.navigate('screen3')}>
        <Text style={styles.buttonText}>Proceed</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 20,
  },
  lottieWrapper: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90,
  },
  textContainer: {
    position: 'absolute',
    bottom: 100,  // Adjust this to control how far the text is from the bottom
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Screen_2;
