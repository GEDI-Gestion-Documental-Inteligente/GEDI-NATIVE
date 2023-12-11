import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const PeopleCard = ({ user, onSubmit }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={onSubmit}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <FontAwesome name="user" size={80} color="#03484c" />

          <View style={styles.profileInfo}>
            <Text style={styles.title}>{user.firstName} {user.lastName}</Text>

            <View style={styles.detailsContainer}>
              <View style={styles.item}>
                <Text style={styles.subTitle}>Email:</Text>
                <Text style={styles.text}>{user.email}</Text>
              </View>

              <View  style={styles.item}>
                <Text style={styles.subTitle}>Job:</Text>
                <Text style={styles.text}>{user.jobTitle}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 5,
    paddingVertical: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#03484c",
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  item:{
    marginHorizontal: 5
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#03484c",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "black",
  },
});
