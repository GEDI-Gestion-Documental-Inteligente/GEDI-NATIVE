import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMySites } from "../../redux/modules/sites/SitesThunks";
import { SiteListItem } from "./SiteListItem";
import { SiteSearch } from "./SiteSearch";
import { AddSiteButton } from "./AddSiteButton";

export const SitesList = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const data = useSelector((state) => state.sites.sites);
  const resultSearch = useSelector((state) => state.sites.resultSearch);


  return (
    <View>
      <View style={styles.containerHeader}>
        <SiteSearch/>
        <AddSiteButton/>
      </View>

      {data.length > 0 && (
        <FlatList
          data={resultSearch && resultSearch.length ? resultSearch : data}
          keyExtractor={(item) => item.entry.guid}
          renderItem={({ item }) => <SiteListItem site={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader:{
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: 'center'
  }
})