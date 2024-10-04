import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Animated, Easing, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Dimensions, Pressable } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import useWarmUpBrowser  from "../../hooks/useWarmUpBrowser"
import { useOAuth } from '@clerk/clerk-expo';

const image = require('../../assets/Food.png');
const icon1 = require('../../assets/facebook.png');
const icon2 = require('../../assets/google.png');
const icon3 = require('../../assets/apple.png');

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"});

  const onPress = useCallback(async () => {
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

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.separator}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>or sign up with</Text>
            <View style={styles.line}></View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity  style={styles.iconWrapper}>
              <Image source={icon1} style={styles.icon} />
            </TouchableOpacity >
            <TouchableOpacity onPress={onPress} style={styles.iconWrapper}>
              <Image source={icon2} style={styles.icon} />
            </TouchableOpacity >
            <TouchableOpacity  style={styles.iconWrapper}>
              <Image source={icon3} style={styles.icon} />
            </TouchableOpacity >
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>do not have an account? 
            <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text style={{color: 'orange'}}> Sign Up Now</Text>
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
