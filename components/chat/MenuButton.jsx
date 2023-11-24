import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const SliderButton = () => {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionSelect = (option) => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          activeOption === 1 && { backgroundColor: "#03484c" },
        ]}
        onPress={() => handleOptionSelect(1)}
      >
        <MaterialCommunityIcons
          name="database-search"
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          activeOption === 2 && { backgroundColor: "#03484c" },
        ]}
        onPress={() => handleOptionSelect(2)}
      >
        <AntDesign name="pdffile1" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          activeOption === 3 && { backgroundColor: "#03484c" },
        ]}
        onPress={() => handleOptionSelect(3)}
      >
        <Foundation name="page-csv" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          activeOption === 4 && { backgroundColor: "#03484c" },
        ]}
        onPress={() => handleOptionSelect(4)}
      >
        <MaterialCommunityIcons name="file" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 'auto',
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    overflow: "hidden",
    margin: 10
  },
  option: {
    flex: 1,
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SliderButton;
