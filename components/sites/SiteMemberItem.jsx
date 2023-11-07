import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const SiteMemberItem = ({ member }) => {
  console.log(member);
  return (
    <View style={styles.item}>
      <View  style={styles.icon}>
        <AntDesign name="user" size={22} color="#03484c" />
      </View>

      <View>
        <Text style={styles.memberName}>
          {member.entry.person.firstName} {member.entry.person.lastName}
        </Text>
        <Text style={styles.memberDescription}>{member.entry.role}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
  },
  memberName: {
    fontSize: 18,
    fontWeight: "normal",
  },
  memberDescription: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#888888",
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
    alignSelf: "center",
    marginTop: 20,
  },
  icon: {
    margin: 3
  },
});
