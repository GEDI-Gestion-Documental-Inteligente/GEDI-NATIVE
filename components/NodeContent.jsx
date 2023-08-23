import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'; // Importamos Axios
import { IPV4_ADDRESS } from '../screens/SiteScreen';

export const NodeContent = ({ route }) => {
  const { id, ticket } = route.params;
  const [pdfUrl, setPdfUrl] = useState('');

  const fetchContentNode = async (id, ticket) => {
    const myheaders = {
      headers: {
        Authorization: 'Basic ' + ticket
      }
    };

    try {
      const response = await axios.get(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`,
        myheaders
      );
      
      return response.request.responseURL;
    } catch (error) {
      console.error('Error fetching PDF content:', error);
      return null;
    }
  };

  const fetchData = async () => {
    const pdfUrl = await fetchContentNode(id, ticket);
    if (pdfUrl) {
      setPdfUrl(pdfUrl);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, ticket]);

  const openPdf = async () => {
    try {
      if (pdfUrl) {
        await Print.printAsync({
          uri: pdfUrl
        });
      } else {
        console.log('No PDF URL available');
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openPdf} style={styles.button}>
        <Text style={styles.buttonText}>Open PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});
