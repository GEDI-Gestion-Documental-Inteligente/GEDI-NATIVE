import React, { useState, useEffect } from 'react';
import { View, StyleSheet, WebView } from 'react-native';

const MyPdfViewer = ({ pdfBuffer }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Convierte el buffer en un Blob
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    // Crea una URL temporal para el Blob
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfBlobUrl);

    return () => {
      // Limpia el objeto URL cuando el componente se desmonta
      URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBuffer]);

  return (
    <View style={styles.container}>
      {pdfUrl && <WebView style={styles.pdf} source={{ uri: pdfUrl }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});

export default MyPdfViewer;
