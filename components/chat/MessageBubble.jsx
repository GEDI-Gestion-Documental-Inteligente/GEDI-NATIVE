import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const MessageBubble = ({ message, isTyping }) => {
  const { text, sender } = message;
  const isUserMessage = sender === 'user';
  const time = new Date();


  return (
    <View style={isUserMessage ? styles.userMessageContainer : styles.botMessageContainer}>
      <View style={styles.messageContent}>
        <Text style={isUserMessage ? styles.userMessageText : styles.botMessageText}>{text}</Text>
        {!isUserMessage && isTyping && (
          <ActivityIndicator style={styles.typingIndicator} color="white" size="small" />
        )}
        <Text style={styles.messageTime}>{`${time.getHours()}:${('0' + time.getMinutes()).slice(-2)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botMessageContainer: {
    backgroundColor: '#03484c',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    margin: 10,
    alignSelf: 'flex-start',
    width:'80%'
  },
  userMessageContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderTopRightRadius: 0,
    margin: 10,
    alignSelf: 'flex-end',
  },
  botMessageText: {
    color: 'white',
    fontSize: 20,
  },
  userMessageText: {
    color: '#000',
    fontSize: 20,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  messageTime: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    top: 15,
    marginHorizontal: 5,
  },
  typingIndicator: {
    marginLeft: 5,
  },
});

export default MessageBubble;
