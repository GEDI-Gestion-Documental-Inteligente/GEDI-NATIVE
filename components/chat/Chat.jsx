import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Bubble, GiftedChat } from "react-native-gifted-chat";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  const onSendButtonPress = (newMessages = []) => {
    // Lógica para enviar el mensaje
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (

      <GiftedChat
        placeholder="Escribe un mensaje..."
        messages={messages}
       onSend={onSendButtonPress}
        user={{
          _id: 1, // ID de usuario
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: "lightgray", // Cambia el color del fondo para los mensajes del lado izquierdo
                },
                right: {
                  backgroundColor: "#BCC4BC", // Cambia el color del fondo para los mensajes del lado derecho
                },
              }}
            />
          );
        }}
        renderAvatar={(props) => {
          return <Avatar source={"./png.png"} />; // Usa el Avatar con la fuente del mensaje actual
        }}
      />

  );
};


