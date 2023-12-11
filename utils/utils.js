import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";



export const pickImage = async () => {
  try {
    const imageRes = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (imageRes.type === "success" && imageRes.uri) {
      const assets = imageRes.assets;
      const image = assets[0];

      const imageData = {
        name: image.name,
        uri: image.uri,
        type: image.mimeType,
        size: image.size,
      };

     return imageData;
     
    }
  } catch (error) {
    console.log(error);
  }
};
