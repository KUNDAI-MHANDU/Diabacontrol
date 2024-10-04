import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { useUser } from '@clerk/clerk-expo';
import { getDatabase, ref, set, push, onValue } from "firebase/database"; // Import onValue for reading data

const CommuniteChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useUser();

  // Fetch messages from Firebase Realtime Database
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages'); // Reference to the 'messages' path

    // Listen for new messages in the database
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transform the data into an array of messages
        const loadedMessages = Object.keys(data).map((key) => ({
          _id: key,
          text: data[key].text,
          createdAt: new Date(data[key].createdAt),
          user: data[key].user,
        }));

        // Sort the messages by the creation date
        loadedMessages.sort((a, b) => b.createdAt - a.createdAt);

        // Update the state to display the messages
        setMessages(loadedMessages);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const onSend = useCallback((newMessages = []) => {
    // Update the local state to append new messages
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const db = getDatabase();
    const messagesRef = ref(db, 'messages'); // Specify the path in your Realtime Database

    // Loop through each message and push it to the Firebase database
    newMessages.forEach((message) => {
      const newMessageRef = push(messagesRef); // Push each message as a new node
      set(newMessageRef, {
        ...message,
        createdAt: message.createdAt.toISOString(), // Store the date as a string
      });
    });
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084ff', // Blue for sent messages
          },
          left: {
            backgroundColor: '#f0f0f0', // Light grey for received messages
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#333',
          },
        }}
      />
    );
  };

  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: {
            borderRadius: 50,
            borderWidth: 2,
            borderColor: '#ddd',
          },
        }}
      />
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.example.com/background.png' }} // Add a stylish background
      style={styles.background}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.id || 1, // Use user ID from your user object
          name: user?.fullName || 'User',
          avatar: user?.imageUrl || 'https://www.example.com/default-avatar.png', // Default avatar if not available
        }}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        placeholder="Type a message..."
        showAvatarForEveryMessage={true} // Shows avatar for every message
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  bubble: {
    backgroundColor: '#e6f0ff',
    padding: 8,
    borderRadius: 10,
  },
});

export default CommuniteChatScreen;
