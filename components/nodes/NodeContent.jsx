import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentNode } from "../../redux/modules/nodes/NodeThunks";
import RNFS from 'react-native-fs';

export const NodeContent = ({ route }) => {
  const { id, path } = route.params;
  const pwd = __dirname
  const pathUrl = `${PWD}/GEDI-BACK/uploads/path`
  console.log(path)
  const [pdfUrl, setPdfUrl] = useState("");
  const dispatch = useDispatch()
  const ticket = useSelector((state) => state.auth.ticket);


  async function obtenerDirectorioActual() {
    try {
      const directorioActual = await RNFS.CWD();
      console.log('Directorio actual:', directorioActual);
    } catch (error) {
      console.error('Error al obtener el directorio actual:', error);
    }
  }

  // Llama a la función para obtener el directorio actual
  obtenerDirectorioActual();
  // const fetchData = async () => {
  //   const pdfUrl = await dispatch(fetchContentNode({ id, ticket }))
  //   console.log(pdfUrl)
  // };

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

  // useEffect(() => {
  //   fetchData();
  // }, [id, ticket]);

  return <View style={styles.container}>

  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
