import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { searchSiteFormTerm } from "../../redux/modules/sites/SitesThunks";
import { useEffect } from "react";
import { clearSearch } from "../../redux/modules/sites/siteSlice";

export const SiteSearch = () => {
  const [term, setTerm] = useState("");
  const ticket = useSelector((state) => state.auth.ticket);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (term.length >= 3) {
      await dispatch(searchSiteFormTerm({ term, ticket }));
      return;
    } else {
      alert("Escriba al menos 3 letras");
      return;
    }
  };

  useEffect(() => {
    if (term.length == 0) {
      dispatch(clearSearch());
    }
  }, [term]);

  return (
    <View style={styles.containerSearch}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ej: Public Sit..."
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
    height: 60,
    display: "flex",
    padding: 5,
    backgroundColor: "white",
    padding: 10,
    width: "90%",
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
