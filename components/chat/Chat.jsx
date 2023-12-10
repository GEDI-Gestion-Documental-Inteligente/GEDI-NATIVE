import React, { useEffect, useRef, useState } from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage } from "../../utils/utils";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import ModalsSuggestions from "./ModalsSuggestions";
export const Chat = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const [recording, setRecording] = useState();
  const [textSelected, setTextSelected]= useState('')

  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const requestStoragePermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.READ_EXTERNAL_STORAGE,
      Permissions.WRITE_EXTERNAL_STORAGE
    );

    if (status !== "granted") {
      console.error("Permiso de escritura en almacenamiento externo denegado");
      return false;
    }

    return true;
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    const filename = `${Date.now()}.m4a`;
    const customPath =
      FileSystem.documentDirectory + "ruta/personalizada/" + filename;

    try {
      const hasPermission = await requestStoragePermission();

      if (hasPermission) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "ruta/personalizada",
          {
            intermediates: true,
          }
        );
        await FileSystem.moveAsync({
          from: uri,
          to: customPath,
        });
        console.log("Archivo de audio guardado en:", customPath);
      }
    } catch (error) {
      console.error("Error al guardar el audio:", error);
    }

    console.log("Recording stopped and stored at", uri);
  };

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

  useEffect(()=>{
    if(newMessage == '' && textSelected !== ''){
      console.log('a')
      setNewMessage(textSelected)
    }
  },[textSelected, setTextSelected])

  return (
    <View style={{ flex: 1 }}>
      {messages && messages.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => Math.random().toString()}
          renderItem={({ item }) => (
            <MessageBubble message={item} isTyping={isTyping} />
          )}
        />
      ) : (
        <ModalsSuggestions props={[textSelected, setTextSelected]} />
      )}

      <View style={styles.inputContainer}>
        <Pressable onPress={handleToggleModal}>
          <MaterialCommunityIcons name="paperclip" size={30} color="#03484c" />
        </Pressable>
        <Pressable onPress={recording ? stopRecording : startRecording}>
          <MaterialIcons name="keyboard-voice" size={30} color="#03484c" />
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
            color={"#03484c"}
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
                <FontAwesome5 name="file-upload" size={35} color="#03484c" />
              </Pressable>

              <Pressable style={styles.modalOption} onPress={pickImage}>
                <FontAwesome5 name="file-image" size={35} color="#03484c" />
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
    borderBottomLeftRadius: 0,
    width: 120,
    margin: 10,
    left: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalOption: {
    padding: 10,
  },
});

export default Chat;
