import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SiteItem = ({ siteData, onPress }) => {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress}>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{siteData.entry.site.title}</Text>
          <Text style={styles.description}>{siteData.entry.site.description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 4,
    width: 150,
    margin: 10,
    height: 150,

  },
 
  infoContainer: {
    position: "absolute"
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#03484c"
  },
  description: {
    color: '#03484c',
    fontSize: 12
  },
});

export default SiteItem;
