import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { getPeople } from "../../redux/modules/people/peopleThunks";
import { createSiteMember, getSiteMembers } from "../../redux/modules/sites/SitesThunks";

export const FormAddSiteMember = ({ handleModal, siteId }) => {
  const ticket = useSelector((state) => state.auth.ticket);
  const people = useSelector((state) => state.people.people);
  const dispatch = useDispatch();
  const [siteMember, setSiteMember] = useState({
    id: "",
    role: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPersonName, setSelectedPersonName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getPeople({ ticket }));
    };

    fetch();
  }, []);

  const handleInputChange = (field, value) => {
    setSiteMember({...siteMember, role: value });
  };

  const handleSearch = () => {
    const filteredResults = people.filter((person) =>
      person.entry.firstName.includes(searchTerm)
    );
    setSearchResults(filteredResults);
  };

  const handleSelectPerson = (person) => {
    setSiteMember({...siteMember, id: person.entry.id });
    setSelectedPersonName(`${person.entry.firstName} ${person.entry.lastName}`);
    setSearchResults([]); // Limpiar los resultados después de seleccionar una persona
    setSearchTerm("");
  };

  const renderSearchResult = ({ item }) => (
    <Pressable
      style={styles.searchResultItem}
      onPress={() => handleSelectPerson(item)}
    >
      <Text>
        {item.entry.firstName} {item.entry.lastName}
      </Text>
    </Pressable>
  );

  const handleSubmit = async () => {
    // Validar el formulario antes de enviar los datos
    handleModal()
    if (siteMember.id !== "" && siteMember.role !== "") {
      await dispatch(
        createSiteMember({ ticket, siteId, userData: siteMember })
      );
      await dispatch(getSiteMembers({ ticket, siteId }));
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <Text style={styles.title}>Agregar miembro</Text>

        <TextInput
          style={styles.input}
          placeholder="Buscar persona"
          placeholderTextColor="#03484c"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          onBlur={handleSearch}
        />
        <FlatList
          data={searchResults}
          renderItem={searchResults ? renderSearchResult : ""}
          keyExtractor={(item) => Math.random().toString()}
          style={styles.searchResultsContainer}
        />
        {selectedPersonName && (
          <TextInput
            style={styles.selectedPersonInput}
            value={selectedPersonName}
            editable={false}
          />
        )}
        <Picker
          selectedValue={siteMember.role}
          style={styles.picker}
          onValueChange={(itemValue) => handleInputChange("role", itemValue)}
        >
          <Picker.Item label="SiteConsumer" value="SiteConsumer" />
          <Picker.Item label="SiteCollaborator" value="SiteCollaborator" />
          <Picker.Item label="SiteContributor" value="SiteContributor" />

          <Picker.Item label="SiteManager" value="SiteManager" />
        </Picker>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textButton}>Agregar nuevo miembro</Text>
        </Pressable>
        <Pressable style={styles.buttonCancel} onPress={handleModal}>
          <Text style={styles.textButton}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBody: {
    padding: 30,
    backgroundColor: "white",
    height: 500,
    width: 350,
  },
  input: {
    height: 40,
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#03484c",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#03484c",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 5,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: "#C7CBC7",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 5,
  },
  searchResultsContainer: {
    marginTop: 10,
    maxHeight: 100,
    overflowY: "auto",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedPersonInput: {
    height: 40,
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
