import React, { useState, useEffect } from 'react';
import { View, StatusBar, Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SiteItem from '../components/SiteItem'; // Importamos el componente SiteItem
import { encode } from 'base-64';
import { FlatList } from 'react-native';
export const IPV4_ADDRESS = '192.168.137.1'

export const SiteScreen = () => {
  const navigation = useNavigation();
  const [columns, setColumns] = useState(2)

  const [sites, setSites] = useState([]);

  const fetchTicket = async () => {
    const myheaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: 'admin', password: '12345' })
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/authentication/versions/1/tickets`,
      myheaders
    );
    const data = await response.json();
    return encode(data.entry.id);
  };

  const fetchSitesData = async (ticket) => {
    const myheaders = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + ticket
      }
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/sites`,
      myheaders
    );
    const data = await response.json();
    console.log(data.list.entries)
    return data.list.entries;
  };

  useEffect(() => {
    const fetchData = async () => {
      const ticket = await fetchTicket();
      const sitesData = await fetchSitesData(ticket);
      setSites(sitesData);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <SiteItem
      siteData={item}
      onPress={async () => {
        const ticket = await fetchTicket();
        navigation.navigate('Children', {
          id: item.entry.guid,
          ticket,
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
      numColumns={columns}
        data={sites}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style='auto' />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex:1,
    width: "auto",
    height: "100%",
    padding: 30,
    backgroundColor: "#4D6F5F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
})
