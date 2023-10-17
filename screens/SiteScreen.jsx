// SiteScreen.js
import React, { useEffect } from "react";
import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SiteItem from "../components/SiteItem";
import { useDispatch, useSelector } from "react-redux";
import { getMySites } from "../redux/modules/sites/SitesThunks";
import DropdownMenu from "../components/MenuComponent";

export const SiteScreen = () => {
  const navigation = useNavigation();
  const ticket = useSelector((state) => state.auth.ticket);
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
          id: item.entry.site.guid,
          siteName: item.entry.site.id,
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <DropdownMenu />

      <View style={styles.cardContainer}>
        {sites.length > 0 && (
          <FlatList
            numColumns={2}
            data={sites}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    height: "100%",
    backgroundColor: "#E6E7E6"

  },
  cardContainer:{
    flex: 1,
    alignItems: "center",
    height: "100vh",

  }
})
