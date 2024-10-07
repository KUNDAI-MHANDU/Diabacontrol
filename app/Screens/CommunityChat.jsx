import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { useUser } from '@clerk/clerk-expo';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { useActionSheet } from '@expo/react-native-action-sheet'; // Import ActionSheet

const CommuniteChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); // State for reply
  const { showActionSheetWithOptions } = useActionSheet(); // Get the ActionSheet function
  const { user } = useUser();

  // Fetch messages from Firebase
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.keys(data).map((key) => ({
          _id: key,
          text: data[key].text,
          createdAt: new Date(data[key].createdAt),
          user: data[key].user,
          replyTo: data[key].replyTo || null, // Load reply data
        }));
        loadedMessages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(loadedMessages);
      }
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages.map((message) => ({
          ...message,
          createdAt: new Date(message.createdAt),  // Ensure the date is a Date object
          replyTo: replyingTo ? { text: replyingTo.text, user: replyingTo.user } : null,
        })))
      );

    const db = getDatabase();
    const messagesRef = ref(db, 'messages');
    newMessages.forEach((message) => {
      const newMessageRef = push(messagesRef);
      set(newMessageRef, {
        ...message,
        createdAt: message.createdAt.toISOString(),
        replyTo: replyingTo ? { text: replyingTo.text, user: replyingTo.user } : null,
      });
    });

    setReplyingTo(null);
  }, [replyingTo]);

  // Function to delete a message from Firebase
  const handleDeleteMessage = (messageId) => {
    const db = getDatabase();
    const messageRef = ref(db, `messages/${messageId}`);
    remove(messageRef); // Delete message from Firebase
  };

  const renderBubble = (props) => {
    return (
      <View>
        {props.currentMessage.replyTo && (
          <View style={styles.replyContainer}>
            <Text style={styles.replyText}>
              {props.currentMessage.replyTo.user.name}: {props.currentMessage.replyTo.text}
            </Text>
          </View>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#0084ff' },
            left: { backgroundColor: '#f0f0f0' },
          }}
          textStyle={{
            right: { color: '#fff' },
            left: { color: '#333' },
          }}
          onLongPress={() => onLongPress(null, props.currentMessage)} // Attach onLongPress here
        />
      </View>
    );
  };

  const onLongPress = (context, message) => {
    const options = ['Reply', 'Delete', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: 1, // "Delete" will appear red
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setReplyingTo(message); // Set the message to reply to
        } else if (buttonIndex === 1) {
          // Confirm delete action before proceeding
          Alert.alert(
            'Delete Message',
            'Are you sure you want to delete this message?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => handleDeleteMessage(message._id), // Call delete function
              },
            ],
            { cancelable: true }
          );
        }
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={{ uri: 'https://www.example.com/background.png' }}
        style={styles.background}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          onLongPress={onLongPress}
          user={{
            _id: user?.id || 1,
            name: user?.fullName || 'User',
            avatar: user?.imageUrl || 'https://www.example.com/default-avatar.png',
          }}
          renderBubble={renderBubble}
          placeholder="Type a message..."
          showAvatarForEveryMessage={true}
          scrollToBottom // Enables automatic scrolling to bottom
          inverted={true} // Default: messages appear at the bottom
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  replyContainer: {
    backgroundColor: '#e6e6e6',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  replyText: {
    fontStyle: 'italic',
    color: '#555',
  },
});

export default CommuniteChatScreen;
