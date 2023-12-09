import { StyleSheet, View } from "react-native";
import { Chat } from "../components/chat/Chat";
import { TabChat } from "../components/chat/TabChat";
import SliderButton from "../components/chat/MenuButton";

export const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <TabChat />
      {/* <SliderButton/> */}
      <Chat />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },

})