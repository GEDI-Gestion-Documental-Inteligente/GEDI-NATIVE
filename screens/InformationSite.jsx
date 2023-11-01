import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";

export const InformationSite = ({ route }) => {
  const { siteData } = route.params;
  console.log(siteData);
  return (
    <View style={styles.container}>
      <View style={styles.containerSiteTab}>
        <AntDesign name="setting" size={30} color="black" />
        <AntDesign name="adduser" size={30} color="black" />

        <Pressable style={styles.buttonMember}>
          <Text style={styles.textButton}>Miembros del sitio</Text>
        </Pressable>
      </View>
      <View style={styles.bodySiteInformation}>
        <Text style={styles.titleSite}>{siteData.title}</Text>
        <Text style={styles.subtitleSite}>{siteData.description}</Text>
        <Text style={styles.subtitleSite}>{siteData.visibility}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerSiteTab: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: 10,
  },
  buttonMember: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#03484c",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 15,
    color:'white'
  },
  bodySiteInformation: {
    flex: 1,
  },
  titleSite: {
    fontSize: 25,
    fontWeight: "normal",
    paddingHorizontal: 10,
    color: '#03484c'
  },
  subtitleSite: {
    fontSize: 15,
    fontWeight: "normal",
    paddingHorizontal: 10,
    color: "#273746",
  },
});
