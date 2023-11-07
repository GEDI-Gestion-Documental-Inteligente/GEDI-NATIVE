import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";
import { SiteActivitiesList } from "../components/sites/SiteActivitiesList";
import { SiteMembersList } from "../components/sites/SiteMembersList";

export const InformationSite = ({ route }) => {
  const { siteData } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.containerSiteTab}>
        <AntDesign name="setting" size={30} color="#03484c" />
        <AntDesign name="adduser" size={30} color="#03484c"/>
      </View>
      <View style={styles.bodySiteInformation}>
        <Text style={styles.titleSite}>{siteData.title}</Text>
        <Text style={styles.subtitleSite}>{siteData.description}</Text>
        <Text style={styles.subtitleSite}>{siteData.visibility}</Text>
      </View>

      <SiteActivitiesList siteData={siteData} />
      <SiteMembersList siteData={siteData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  containerSiteTab: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  buttonMember: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#03484c",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 15,
    color: "white",
  },
  bodySiteInformation: {
    flex: 1,
  },
  titleSite: {
    fontSize: 25,
    fontWeight: "normal",
    color: "#03484c",
  },
  subtitleSite: {
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
});
