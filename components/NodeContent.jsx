import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useSelector } from "react-redux";
import { IPV4_ADDRESS } from "../redux/services/SitesThunks";

export const NodeContent = ({ route }) => {
  const { id } = route.params;
  const [pdfUrl, setPdfUrl] = useState("");
  const ticket = useSelector(state => state.auth.ticket)

  const fetchContentNode = async (id) => {
    const myheaders = {
      Authorization: "Basic " + ticket,
    };

    try {
      const response = await fetch(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`,
        { headers: myheaders }
      );
      const pdfUrl = response.url;
      setPdfUrl(pdfUrl);
      console.log(response.url);
      return pdfUrl;
    } catch (error) {
      console.error("Error fetching PDF content:", error);
      return null;
    }
  };

  const fetchData = async () => {
    const pdfUrl = await fetchContentNode(id, ticket);
    if (pdfUrl) {
      setPdfUrl(pdfUrl);
    }
  };

  const openPdfWithLinking = async () => {
    if (pdfUrl) {
      const supported = await Linking.canOpenURL(pdfUrl);
      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        console.error("Cannot open PDF URL:", pdfUrl);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, ticket]);

  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
