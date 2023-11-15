import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message }) => {
  const { text, sender } = message;
  const isUserMessage = sender === 'user';

  return (
    <View style={isUserMessage ? styles.userMessageContainer : styles.botMessageContainer}>
      <Text style={isUserMessage ? styles.userMessageText : styles.botMessageText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  botMessageContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 10,
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 10,
    alignSelf: 'flex-end',
  },
  botMessageText: {
    color: '#000',
    fontSize: 20
  },
  userMessageText: {
    color: '#000',
    fontSize: 20
  },
});

export default MessageBubble;
