import { useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ModalsSuggestions = ({ props }) => {
  const [textSelected, setTextSelected] = props;
  const suggestions = [
    {
      title: "Buscar en la base de datos",
      subtitle: "Dime las asistencias totales de los alumnos de ...",
    },
    {
      title: "Preguntar sobre un documento",
      subtitle: "Puedes decirme de que trata el documento ....",
    },
    {
      title: "Generar gráficos",
      subtitle:
        "Puedes generarme un grafico con los datos estadisticos del documento ...",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <FlatList
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item, index) => index.toString()}
        data={suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{setTextSelected(item.subtitle)}}>
            <View style={styles.suggestion}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  spacer: {
    flex: 1,
  },
  suggestion: {
    width: "90%",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 15,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
});

export default ModalsSuggestions;
