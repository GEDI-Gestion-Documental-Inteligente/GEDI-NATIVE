import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SendButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Ionicons name="send" size={25} color="grey" />
    </TouchableOpacity>
  );
};

export const ClipButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Ionicons name="attach" size={25} color="grey" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
    },
  });