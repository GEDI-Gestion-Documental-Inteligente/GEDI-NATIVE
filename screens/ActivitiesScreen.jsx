import React, { useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMyActivities } from "../redux/modules/people/peopleThunks";
import DropdownMenu from "../components/MenuComponent";

export const ActivitiesScreen = () => {
  const ticket = useSelector((state) => state.auth.ticket);
  const activities = useSelector((state) => state.people.activities);
  const userLoggued = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyActivities({ userLoggued, ticket }));
  }, []);

  const renderActivity = ({ item }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityType}>{item.entry.activitySummary.firstName} ha {item.entry.activityType} {item.entry.activitySummary.title}</Text>
      <Text style={styles.activityDate}>{item.entry.postedAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <DropdownMenu />
      <View style={styles.activityList}>
        {activities.length > 0 ? (
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.entry.id.toString()}
            numColumns={1}
          />
        ) : (
          <Text style={styles.emptyText}>No hay actividades disponibles</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    height: "100%",
    backgroundColor: "#E6E7E6",
  },
  activityList: {
    flex: 1,
    padding: 10,
  },
  activityContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,

  },
  activityType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#03484c",
  },
  activityDate: {
    fontSize: 14,
    color: "#888888",
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default ActivitiesScreen;
