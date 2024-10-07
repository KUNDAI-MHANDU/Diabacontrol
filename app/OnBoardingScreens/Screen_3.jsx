import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const Screen_3 = () => {
    const navigation = useNavigation();
  // Step 1: Set up the animated value for slide-down effect
  const slideAnim = useRef(new Animated.Value(1000)).current;  // Start above the screen

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
          source={require('../../assets/Animation - 1728126161271.json')}
          style={{ width: '100%', height: '100%' }}
          autoPlay
          loop
        />
      </View>

      {/* Step 3: Use Animated.View for sliding-down animation */}
        <Text style={styles.title}>Personalized Calculations and Detailed Monitoring for Better Control</Text>
        <Text style={styles.description}>
        From carbohydrate counting to insulin dosing, Diabacontrol provides advanced calculators to get the right numbers every time. Log your blood glucose, manage hypoglycemic episodes, and review detailed reports to stay informed every step of the way. Simplify your diabetes management with precision.
        </Text>
      </Animated.View>

      <Pressable style={styles.button} onPress={() => navigation.navigate('screen4')}>
        <Text style={styles.buttonText}>Advance</Text>
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

export default Screen_3