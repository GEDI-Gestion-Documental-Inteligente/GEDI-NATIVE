import { View } from "react-native";
import { ManageSiteMembers } from "../components/sites/ManageSiteMembers";
import NavBarSiteMembers from "../components/sites/NavBarSiteMembers";
import { StyleSheet } from "react-native";
import siteContext from "../context/sites/siteContext";
export const SiteMembersScreen = ({ route }) => {
  const { siteData } = route.params;
  return (
    <siteContext.Provider value={{ siteData }}>
      <View style={styles.container}>
        <NavBarSiteMembers />
        <ManageSiteMembers  />
      </View>
    </siteContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
