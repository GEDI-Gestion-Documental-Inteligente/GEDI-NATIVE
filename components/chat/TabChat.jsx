import { StyleSheet, Text, View } from "react-native";

export const TabChat = () => {
  return (
    <View style={styles.TabChat}>
        <Text style={styles.textTab}>Alfredo</Text>
        <View style={styles.circle} />
    </View>
  );
};

const styles = StyleSheet.create({
  TabChat: {
    display: "flex",
    alignItems: "center",
    height: "15%",
    backgroundColor: "#4D6F5F",
    justifyContent: "center",
    flexDirection: "row",

  },
  textTab: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 10
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6, // La mitad del ancho o alto para hacer un círculo
    backgroundColor: "#4caf50", // Color verde, puedes cambiarlo según tus necesidades
  },

});
