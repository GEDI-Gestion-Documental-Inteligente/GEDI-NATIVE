import { useContext } from "react";
import nodeContext from "../../context/nodes/nodeContext";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const FormUpdateNode = ({handleModal})=>{
    const { node } = useContext(nodeContext);
    console.log(node)

    const updatedNode = async()=>{

    }

    return(
        <View style={styles.modalOverlay}>
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.iconButton}
            >
               
            </TouchableOpacity>
            <Text style={styles.title}>Modificar</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(text) => handleInputChange("name", text)}
                value={node.name}
            />
            <TextInput
                style={styles.input}
                placeholder="Titulo"
                onChangeText={(text) => handleInputChange("title", text)}
                value={node.properties['cm:title']}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripcion"
                onChangeText={(text) => handleInputChange("description", text)}
                value={node.properties['cm:description']}
            />
            <Pressable style={styles.button}>
                <Text style={styles.textButton}>Actualizar</Text>
            </Pressable>
            <Pressable style={styles.buttonCancel} onPress={()=>{handleModal()}}>
                <Text style={styles.textButton}>Cancelar</Text>
            </Pressable>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    padding: 30,
    backgroundColor: "#E6E7E6",
    width: "90%",

},
input: {
    height: 40,
    width: "auto",
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
},
title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#03484c",
    marginBottom: 20,
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
modalOverlay: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
},
iconButton: {
    position: "absolute",
    right: 0,
    margin: 10
}
});