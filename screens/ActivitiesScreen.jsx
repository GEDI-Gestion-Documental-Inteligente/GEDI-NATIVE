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
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.activityText}>Últimos movimientos</Text>
        <DropdownMenu />
      </View>
      <View style={styles.body}>
        <FlatList
          data={activities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.entry.id.toString()}
          numColumns={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4D6F5F",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    paddingHorizontal:10,
    paddingVertical:10,
  },
  body: {
    flex:1,
    backgroundColor:"#d7d7d7",
    padding:10,
    margin:20,
    borderWidth:1
  },
  activityContainer: {
    flex:1,
    gap:10,
    margin:10,
    minWidth:100,
    borderBottomWidth:1,
    borderBottomColor:"#797979"
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
    fontWeight: "bold",
    color: "#ffffff",
  },
});

