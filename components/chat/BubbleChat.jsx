import React from "react";
import { StyleSheet } from "react-native";
import { Bubble, BarChart } from "react-native-gifted-chat";

const BubbleChat = ({ ...props }) => {
  const styles = StyleSheet.create({
    bubble: {
      borderRadius: 4,
    },
    text: {
      color: "black",
    },
  });

  if (props.currentMessage.type === "BarChart") {
    return <BarChart data={props.currentMessage.data} />;
  } else {
    return <Bubble {...props} style={[styles.bubble, props.style]} />;
  }
};

export default BubbleChat;
