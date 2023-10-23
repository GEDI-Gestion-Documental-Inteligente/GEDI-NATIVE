import React, { useState } from "react";
import { View, Platform, StyleSheet, Button } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/modules/chatAI/chatThunks";
import AttendanceChat from "./TableCharts";
import { useEffect } from "react";
import { ClipButton, SendButton } from "./ButtonsChat";
import BubbleChat  from "./BubbleChat";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const ticket = useSelector((state) => state.auth.ticket);
  const responseAI = useSelector((state) => state.chat.responseAi);
  const [isTyping, setIsTyping] = useState(false);
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

  const handleCharts = () => {
    // Generar el gráfico
    const objJson = {
      alumnos: [
        {
          nombre: "Juan Pérez",
          asistencias: 90,
        },
        {
          nombre: "María García",
          asistencias: 85,
        },
        {
          nombre: "Pedro Rodríguez",
          asistencias: 80,
        },
        {
          nombre: "Ana López",
          asistencias: 75,
        },
        {
          nombre: "Luis Sánchez",
          asistencias: 70,
        },
      ],
    };

    const barData = objJson.alumnos.map((alumno) => {
      return {
        value: alumno.asistencias,
        label: alumno.nombre,
      };
    });

    // Añadir el gráfico al chat
    setMessages([
      ...messages,
      {
        _id: Math.random(),
        data: barData,
        type: "BarChart",
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
      allowCharts={true}
        placeholder="Escribe un mensaje..."
        messages={messages}
        renderBubble={BubbleChat}
        user={{
          _id: 1,
        }}
        inverted={false}
        onInputTextChanged={(text) => {
          setIsTyping(text.length > 0);
        }}
        renderSend={(props) => {
          {
            if (isTyping) {
              return (
                <View style={styles.actionContainer}>
                  <SendButton
                    onPress={() => onSendButtonPress([{ text: props.text }])}
                  />
                </View>
              );
            }
          }
        }}
        renderActions={(props) => {
          return (
            <View style={styles.actionContainer}>
              <ClipButton onPress={handleCharts} />
            </View>
          );
        }}
        renderAvatar={null}
        renderMessage={(props) => {
          const { currentMessage } = props;
      
          if (currentMessage.data) {
            return <AttendanceChat data={currentMessage.data} />;
          } else {
            return <BubbleChat {...props} />;
          }
        }}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
  },
});
