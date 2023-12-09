import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addMessageUser } from "../../redux/modules/chatAI/chatSlice";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { sendMessage } from "../../redux/modules/chatAI/chatThunks";

export const Chat = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSendMessage = async () => {
    if (newMessage) {
      await dispatch(addMessageUser({ text: newMessage, sender: "user" }));
      setIsTyping(true);
      // const res = await dispatch(sendMessage({ticket, text: newMessage}))
      // if(res.payload){
      //   isTyping(false)
      // }

      setNewMessage("");
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => Math.random().toString()}
        renderItem={({ item }) => (
          <MessageBubble message={item} isTyping={isTyping} />
        )}
      />

      <View style={styles.inputContainer}>
        <Pressable onPress={handleToggleModal}>
          <Ionicons
            name={"ios-add-sharp"}
            style={{ left: -3 }}
            size={35}
            color={"black"}
          />
        </Pressable>

        <TextInput
          style={styles.bubble}
          value={newMessage}
          onChangeText={setNewMessage}
          disabled={loading === "pending"}
        />

        <Pressable
          onPress={handleSendMessage}
          disabled={loading === "pending"}
          style={styles.sendButton}
        >
          <Ionicons
            name={"ios-send-sharp"}
            style={{ right: -3 }}
            size={24}
            color={"black"}
          />
        </Pressable>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={handleToggleModal}
      >
        <TouchableWithoutFeedback onPress={handleToggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Pressable style={styles.modalOption}>
                <AntDesign name="paperclip" size={24} color="black" />
              </Pressable>

              <Pressable style={styles.modalOption}>
                <FontAwesome5 name="file-import" size={24} color="black" />
              </Pressable>

              <Pressable style={styles.modalOption}>
                <AntDesign name="barchart" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  bubble: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 20,
    marginEnd: 5,
  },
  sendButton: {
    position: "absolute",
    end: 5,
    backgroundColor: "#cccc",
    borderRadius: 25,
    padding: 10,
    margin: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 100,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 150,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalOption: {
    padding: 10,
  },
});

export default Chat;
