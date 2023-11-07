
import { StyleSheet, Text, View } from "react-native";

export const SiteActivityItem = ( {site} ) => {
  const { item } = site
  console.log(item)
  return (
    <View style={styles.activityContainer}>
      <Text style={styles.activityType}>
        {item.entry.activitySummary.firstName} ha {item.entry.activityType}{" "}
        {item.entry.activitySummary.title}
      </Text>
      <Text style={styles.activityDate}>{item.entry.postedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  activityType: {
    fontSize: 18,
    fontWeight: "normal",
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
