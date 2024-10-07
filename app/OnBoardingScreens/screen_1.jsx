import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const Screen_1 = () => {
 
    const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(1000)).current;  

 
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,  
      duration: 1000,  
      useNativeDriver: true,  
    }).start();
  }, []);

  return (
    <View style={styles.loadingContainer}>
  
      <Animated.View style={[styles.animationContainer, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.lottieWrapper}>
          <LottieView
            source={require('../../assets/Animation - 1728111823849.json')}
            style={{ width: '100%', height: '100%' }}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.loadingText}>Welcome To DiabaControl</Text>
      </Animated.View>

      <Pressable style={styles.button} onPress={() => navigation.navigate('screen2')}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  animationContainer: {
    height: '60%',
    width: '100%',
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lottieWrapper: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
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

export default Screen_1;
