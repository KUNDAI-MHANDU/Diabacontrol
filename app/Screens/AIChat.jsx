import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import LottieView from 'lottie-react-native';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyBXqyUQKZO5e12dU1jYQ4O4deWj5rm6xEg");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default function AiChat() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, how can I assist you today?', user: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'user',
      parts: [{ text: 'Hello' }],
    },
    {
      role: 'model',
      parts: [{ text: 'Great to meet you. What would you like to know?' }],
    },
  ]);

  const [showAnimation, setShowAnimation] = useState(true);

  const sendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = { id: Date.now().toString(), text: inputText, user: 'me' };
      setMessages(prevMessages => [userMessage, ...prevMessages]);

      const updatedHistory = [
        ...chatHistory,
        { role: 'user', parts: [{ text: inputText }] },
      ];
      setChatHistory(updatedHistory);

      try {
   
        const chat = model.startChat({ history: updatedHistory });
        const result = await chat.sendMessage(inputText);

        
        const botMessage = { id: Date.now().toString(), text: result.response.text(), user: 'bot' };
        setMessages(prevMessages => [botMessage, ...prevMessages]);

   
        setChatHistory(prevHistory => [
          ...prevHistory,
          { role: 'model', parts: [{ text: result.response.text() }] },
        ]);
      } catch (error) {
        console.error('Error interacting with Gemini:', error);
      }

      setInputText(''); 

     
      setShowAnimation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'android' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 0}
      style={styles.container}>

        {showAnimation && (
          <View style={{ height: 240, width: '100%' }}>
            <LottieView 
              source={require('../../assets/Animation - 1727890069650.json')}
              style={{ width: '100%', height: '100%' }}
              autoPlay
              loop
            />
          </View>
        )}

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Message item={item} />}
          inverted
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const Message = ({ item }) => (
  <View style={[styles.messageContainer, item.user === 'me' ? styles.myMessage : styles.otherMessage]}>
    <Text style={styles.messageText}>{item.text}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 12,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
