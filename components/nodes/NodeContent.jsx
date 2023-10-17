import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentNode } from "../../redux/modules/nodes/NodeThunks";

export const NodeContent = ({ route }) => {
  const { id } = route.params;
  const [pdfUrl, setPdfUrl] = useState("");
  const dispatch = useDispatch()
  const ticket = useSelector((state) => state.auth.ticket);


  const fetchData = async () => {
    const pdfUrl = await dispatch(fetchContentNode({id, ticket}))
    console.log(pdfUrl)
  };

  // const openPdfWithLinking = async () => {
  //   if (pdfUrl) {
  //     const supported = await Linking.canOpenURL(pdfUrl);
  //     if (supported) {
  //       await Linking.openURL(pdfUrl);
  //     } else {
  //       console.error("Cannot open PDF URL:", pdfUrl);
  //     }
  //   }
  // };

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
