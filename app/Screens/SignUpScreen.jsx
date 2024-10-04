import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Pressable, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Dimensions, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const image = require('../../assets/Food.png');
const icon1 = require('../../assets/facebook.png');
const icon2 = require('../../assets/google.png');
const icon3 = require('../../assets/apple.png');

export default function SignUp() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 16000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotate.start();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      rotate.stop();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Handle sign up logic here
    // For example, navigate to another screen or call an API

    // Navigate to another screen (e.g., Login screen)
    router.push('/LoginScreen');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'orange' }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Animated.View style={[styles.light, animatedStyle]} />
        {!keyboardVisible && (
          <Animated.Image source={image} style={[styles.image, animatedStyle, { top: screenHeight * 0.2 }]} />
        )}
        <View style={[styles.content, { paddingTop: screenHeight * 0.15 }]}>
          <Text>Email</Text>
          <View style={styles.input}>
            <Fontisto name="email" size={24} color="black" />
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email"
              style={styles.textInput}
            />
          </View>
          <Text>Password</Text>
          <View style={styles.input}>
            <EvilIcons name="lock" size={34} color="black" />
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <Text>Confirm Password</Text>
          <View style={styles.input}>
            <EvilIcons name="lock" size={34} color="black" />
            <TextInput
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.separator}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>or Sign Up with</Text>
            <View style={styles.line}></View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <View style={styles.iconWrapper}>
              <Image source={icon1} style={styles.icon} />
            </View>
            <View style={styles.iconWrapper}>
              <Image source={icon2} style={styles.icon} />
            </View>
            <View style={styles.iconWrapper}>
              <Image source={icon3} style={styles.icon} />
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>Already have an account? 
            <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: 'orange'}}> Sign In Now</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    height: 170,
    width: 170,
    alignSelf: 'center',
    zIndex: 1,
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  input: {
    height: 60,
    borderWidth: 0,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    flex: 1,
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 20,
    marginTop: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
  },
  light: {
    position: 'relative',
    top: 235,
    left: 95,
    width: 10,
    height: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    zIndex: 0,
  },
  iconWrapper: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
