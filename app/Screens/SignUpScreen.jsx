import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Pressable, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Dimensions, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSignUp } from '@clerk/clerk-expo';
import useWarmUpBrowser  from "../../hooks/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';

const image = require('../../assets/Food.png');
const icon1 = require('../../assets/facebook.png');
const icon2 = require('../../assets/google.png');
const icon3 = require('../../assets/apple.png');

WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {

  useWarmUpBrowser();
  
  const { isLoaded, signUp, setActive } = useSignUp()
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
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

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }else if (password == confirmPassword) {

    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorMessage = err.errors?.[0]?.message || 'An unexpected error occurred. Please try again.';
      Alert.alert('Sign Up Error', errorMessage);
    }

  }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        navigation.navigate('Tablayout')
      } else {
        const errorMessage = err.errors?.[0]?.message || 'An unexpected error occurred. Please try again.';
        Alert.alert('Sign Up Error', errorMessage);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorMessage = err.errors?.[0]?.message || 'An unexpected error occurred. Please try again.';
      Alert.alert('Sign Up Error', errorMessage);
    }
  };

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"});

  const onPressGoogle = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = 
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // 
      } 
    } catch (err) {
      console.error("OAuth error", err)
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'orange' }}
      behavior={Platform.OS === 'android' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 20}
    >
      {!pendingVerification && (
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Animated.View style={[styles.light, animatedStyle]} />
          {!keyboardVisible && (
            <Animated.Image source={image} style={[styles.image, animatedStyle, { top: screenHeight * 0.10 }]} />
          )}
          <View style={[styles.content, { paddingTop: screenHeight * 0.15 }]}>
            <Text>Email</Text>
            <View style={styles.input}>
              <Fontisto name="email" size={24} color="black" />
              <TextInput
                onChangeText={(email) => setEmailAddress(email)}
                value={emailAddress}
                placeholder="Enter your email"
                style={styles.textInput}
              />
            </View>
            <Text>Password</Text>
            <View style={styles.input}>
              <EvilIcons name="lock" size={34} color="black" />
              <TextInput
                onChangeText={(password) => setPassword(password)}
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
              <TouchableOpacity style={styles.iconWrapper} onPress={onPressGoogle}>
                <Image source={icon2} style={styles.icon} />
              </TouchableOpacity>
              <View style={styles.iconWrapper}>
                <Image source={icon3} style={styles.icon} />
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: 2}}>
              <Text>do not have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: 'orange'}}> Sign In Now</Text>
                </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
      {pendingVerification && (
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
              <Animated.View style={[styles.light, animatedStyle]} />
              {!keyboardVisible && (
                <Animated.Image source={image} style={[styles.image, animatedStyle, { top: screenHeight * 0.2 }]} />
              )}
              <View style={[styles.content, { paddingTop: screenHeight * 0.15 }]}>
                <Text>Verification Code</Text>
                <View style={styles.input}>
                  <Ionicons name="qr-code-outline" size={24} color="black" />
                  <TextInput
                    onChangeText={(code) => setCode(code)}
                    value={code}
                    placeholder="Code..."
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={onPressVerify}>
                  <Text>Verify Email</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
      )}
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
