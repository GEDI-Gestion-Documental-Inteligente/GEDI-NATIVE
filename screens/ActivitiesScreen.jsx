import { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMyActivities } from "../redux/services/peopleThunks";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import DropdownMenu from "../components/MenuComponent";

export const ActivitiesScreen = () => {
  const ticket = useSelector((state) => state.auth.ticket);
  const activities = useSelector((state) => state.peoples.activities);
  const id = "admin";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyActivities({ id, ticket }));
  }, []);


  const renderActivity = ({ item }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityType}>{item.entry.activityType}</Text>
      <Text style={styles.activityDate}>{item.entry.postedAt}</Text>
      {/* You can display more details from the activity here */}
    </View>
  );

  return (
    <View style={styles.container}>
        <DropdownMenu/>
      <Text style={styles.activityText}>Últimos movimientos</Text>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.entry.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 25,
    paddingVertical: 10,
    height: "auto",
    backgroundColor: "#004725",
  },
  activityContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  activityType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  activityDate: {
    color: "#888888",
  },
  activityText: {
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
