import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const TabChat = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.TabChat}>
        <Pressable
          style={{ left: -120 }}
          onPress={() => navigation.navigate("Sites")}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#03484c" />
        </Pressable>

        <Text style={styles.textTab}>Alfredo</Text>
      </View>

      <View>
        <Text>En linea</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "10%",
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",  
    justifyContent: "center",
  },
  TabChat: {
    flexDirection: "row",
  },
  textTab: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#03484c",
    marginHorizontal: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6, // La mitad del ancho o alto para hacer un círculo
    backgroundColor: "#4caf50", // Color verde, puedes cambiarlo según tus necesidades
  },
});
