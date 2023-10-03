import { StyleSheet, View } from "react-native";
import { Chat } from "../components/chat/Chat";
import { TabChat } from "../components/chat/TabChat";

export const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <TabChat />
      <Chat />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },

})