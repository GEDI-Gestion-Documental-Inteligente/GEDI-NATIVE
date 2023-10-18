import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Bubble, GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/modules/chatAI/chatThunks";

const initialMessages = [
  {
    _id: 1,
    text: "¡Hola! ¿En qué puedo ayudarte?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Asistente",
    },
  },
];

export const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const ticket = useSelector((state) => state.auth.ticket);
  const responseAI = useSelector((state) => state.chat.responseAi);
  const dispatch = useDispatch();

  const onSendButtonPress = async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    const msgRequest = messages[messages.length - 1];

    await dispatch(sendMessage(ticket, msgRequest));

    if (responseAI.length - 1 >= 0) {
      const responseMessage = {
        _id: Math.random(),
        text: responseAI,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Asistente",
        },
      };
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [responseMessage])
      );
    }
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
    />
  );
};
