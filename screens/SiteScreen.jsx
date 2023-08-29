// SiteScreen.js
import React, { useEffect } from "react";
import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SiteItem from "../components/SiteItem";
import { useDispatch, useSelector } from "react-redux";
import { getMySites } from "../redux/services/SitesThunks";
import DropdownMenu from "../components/MenuComponent";


export const SiteScreen = () => {
  const navigation = useNavigation();
  const ticket = useSelector(state => state.auth.ticket)
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.sites.sites);

  useEffect(() => {
    dispatch(getMySites());
  }, []);

  const renderItem = ({ item }) => (
    <SiteItem
      siteData={item}
      onPress={() => {
        navigation.navigate("Nodes", {
          id: item.entry.guid,
          ticket
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <DropdownMenu/>
      <FlatList
        numColumns={2}
        data={sites}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    height: "100%",
    padding: 30,
    backgroundColor: "#4D6F5F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
