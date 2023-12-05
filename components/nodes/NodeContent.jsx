import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Pdf from "react-native-pdf";
import { useSelector } from "react-redux";

const fetchContentNode = async ({ id, path }) => {
  try {
    const ticket = useSelector(state => state.auth.ticket);
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(`${url_base}/uploads/${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    });

    const pdf = response.data
    console.log(pdf)
    return pdf;
  } catch (error) {
    console.error('Failed to fetch PDF content:', error);
    return null; // Return null if PDF data is not available
  }
};

export const NodeContent = ({ id, path }) => {
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const getPdf = async () => {
      const pdfData = await fetchContentNode({ id, path });
      setPdf(pdfData);
    };
    getPdf();
  }, [id, path]);

  useEffect(() => {
    console.log(pdf);
  }, [pdf]);

  return (
    <View style={styles.container}>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pdf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
