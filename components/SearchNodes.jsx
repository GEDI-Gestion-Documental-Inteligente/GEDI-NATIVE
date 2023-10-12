import React, { useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { SearchNodesForTerm } from "../redux/modules/nodes/NodeThunks";
import { useEffect } from "react";

export const SearchNodes = () => {
  const [term, setTerm] = useState("");
  const searchResult = useSelector((state) => state.nodes.searchNodes);
  const ticket = useSelector((state) => state.auth.ticket);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    await dispatch(SearchNodesForTerm({ term, ticket }));
  };


  return (
    <View style={styles.containerSearch}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por algún término..."
          placeholderTextColor="#03484c"
          value={term}
          onChangeText={setTerm}
        />
        <Pressable onPress={handleSearch} style={styles.buttonSend}>
          <MaterialCommunityIcons
            name="send-circle-outline"
            size={30}
            color="#03484c"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSearch: {
    height: 50,
    display: "flex",
    padding: 5,
    width: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#03484c",
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
  },
  input: {
    flex: 1,
    height: 20,
    marginLeft: 10,
  },
  buttonSend: {
    display: "flex",
    alignItems: "center",
  },
});
