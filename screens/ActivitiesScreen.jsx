import { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMyActivities } from "../redux/modules/people/peopleThunks";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import DropdownMenu from "../components/MenuComponent";

export const ActivitiesScreen = () => {
  const ticket = useSelector((state) => state.auth.ticket);
  const activities = useSelector((state) => state.peoples.activities);
  const userLoggued = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyActivities({ userLoggued, ticket }));
  }, []);

  const renderActivity = ({ item }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityType}>{item.entry.activityType}</Text>
      <Text style={styles.activityDate}>{item.entry.postedAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <DropdownMenu />
      <View>
        {activities.length > 0 && (
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.entry.id.toString()}
            numColumns={1}
          />
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
  activityContainer: {
    flex: 1,
    gap: 10,
    margin: 10,
    minWidth: 100,
    backgroundColor: "#E6E7E6",
    padding: 10,
    borderRadius: 8,
    borderWidth:1,
    borderColor: "#03484c"
  },
  activityType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#03484c",
  },
  activityDate: {
    color: "#888888",
  },
});
