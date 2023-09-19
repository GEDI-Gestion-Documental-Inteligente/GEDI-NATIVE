import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useSelector } from "react-redux";

export const NodeContent = ({ route }) => {
  const { id } = route.params;
  const [pdfUrl, setPdfUrl] = useState("");
  const ticket = useSelector((state) => state.auth.ticket);

  const fetchContentNode = async (id) => {
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      Authorization: "Basic " + ticket,
    };

    try {
      const response = await fetch(`${url_base}/nodeContent`, {
        headers: myheaders,
      });
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

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
