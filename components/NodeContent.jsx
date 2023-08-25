import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import PdfRendererView from 'react-native-pdf-renderer';
import { IPV4_ADDRESS } from '../screens/SiteScreen';



export const NodeContent = ({ route }) => {
  const { id, ticket } = route.params;
  const [pdfUrl, setPdfUrl] = useState('');

  const fetchContentNode = async (id, ticket) => {
    const myheaders = {
      Authorization: 'Basic ' + ticket
    };

    try {
      const response = await fetch(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`,
        { headers: myheaders }
      );
      const pdfUrl = response.url;
      setPdfUrl(pdfUrl);
      console.log(pdfUrl);
      return pdfUrl;
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

  return (
    <SafeAreaView style={styles.container}>
      {pdfUrl ? (
        <PdfRendererView
          style={{ flex: 1, backgroundColor: 'black' }}
          source={pdfUrl}
          distanceBetweenPages={10}
          maxZoom={10}
          onPageChange={(current, total) => {
            console.log(current, total);
          }}
        />
      ) : (
        <Text>No PDF available</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
