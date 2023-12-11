import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSiteActivities } from "../../redux/modules/sites/SitesThunks";
import { SiteActivityItem } from "./SiteActivityItem";
import { StyleSheet } from "react-native";

export const SiteActivitiesList = ({ siteData }) => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const siteActivities = useSelector((state) => state.sites.siteActivities);

  useEffect(() => {
    if (siteData.id) {
      const getActivities = async () => {
        await dispatch(getSiteActivities({ ticket, idSite: siteData.id }));
      };
      getActivities();
    }
  }, [siteData]);

  return (
    <View style={styles.activityList}>
      {siteActivities.length > 0 ? (
        <FlatList
          data={siteActivities}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Tus ultimas actividades</Text>
            </View>
          }
          renderItem={(item) => <SiteActivityItem site={item} />}
          keyExtractor={(item, index) => index}
          numColumns={1}
        />
      ) : (
        <Text style={styles.emptyText}>No hay actividades disponibles</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 16,
    color: "#888888",
    alignSelf: "center",
    marginTop: 20,
  },
  activityList: {
    height: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#03484c",
    height: "auto",
  },
  headerTitle: { fontSize: 15, margin: 5, color: "white" },
});
