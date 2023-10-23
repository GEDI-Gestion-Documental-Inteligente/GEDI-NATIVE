import { Pressable, StyleSheet, TextInput, View } from "react-native"
import { searchPeopleForTerm } from "../../redux/modules/people/peopleThunks";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export const PeopleSearch = ()=>{
    const [term, setTerm] = useState("");
    const ticket = useSelector((state) => state.auth.ticket);
    const dispatch = useDispatch();
  
    const handleSearch = async () => {
      if (term.length >= 3) {
        await dispatch(searchPeopleForTerm({ term, ticket }));
        setTerm("");
        return;
      } else {
        alert("Escriba al menos 3 letras");
        return;
      }
    };
    return (
        <View style={styles.containerSearch}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ej: John Do..."
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
        backgroundColor: 'white',
        padding: 10,
        width: '90%'
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