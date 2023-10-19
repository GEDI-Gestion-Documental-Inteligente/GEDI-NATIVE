import React, { useEffect, useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/modules/chatAI/chatThunks";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const ticket = useSelector((state) => state.auth.ticket);
  const responseAI = useSelector((state) => state.chat.responseAi);
  const dispatch = useDispatch();

  const initialMessages = [
    {
      _id: 0,
      text: "¡Hola! ¿En qué puedo ayudarte?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Asistente",
      },
    },
  ];

  useEffect(() => {
    setMessages(initialMessages); // Agregar mensajes iniciales al estado de mensajes
  }, []); // Este efecto solo se ejecutará una vez, después del primer renderizado

  const onSendButtonPress = async (newMessages = []) => {
    const userMessage = {
      _id: Math.random(),
      text: newMessages[0].text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "Usuario",
      },
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Enviar el mensaje del usuario al asistente
    await dispatch(sendMessage({ ticket, text: newMessages[0].text }));
  };

  useEffect(() => {
    if (responseAI) {
      const assistantMessage = {
        _id: Math.random(),
        text: responseAI,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Asistente",
        },
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }
  }, [responseAI]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        placeholder="Escribe un mensaje..."
        messages={messages}
        onSend={onSendButtonPress}
        user={{
          _id: 1,
        }}
        inverted={false}
        renderAvatar={null} // Para mantener los iconos, no modifiques la propiedad renderAvatar
        renderMessage={(props) => {
          const { currentMessage } = props;

          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: currentMessage.user._id === 1 ? "#03484c" : "#BCC4BC",
                  margin: 10
                },
                right: {
                  backgroundColor: currentMessage.user._id === 1 ? "#03484c" : "#BCC4BC",
                  margin:10
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};
