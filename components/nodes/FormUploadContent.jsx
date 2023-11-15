import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
import { createFolder, getNodes, uploadContent } from "../../redux/modules/nodes/NodeThunks";
import * as DocumentPicker from 'expo-document-picker'

export const FormUploadContent = ({ handleClose, children, closeDropdown }) => {
    const dispatch = useDispatch();
    const ticket = useSelector((state) => state.auth.ticket);
    const id = useSelector((state) => state.sites.containerDL)
    const [nodeData, setNodeData] = useState({
        name: "",
        title: "",
        description: "",
        typeDocument: ""
    });
    const [file, setFile] = useState(null);

    const pickDocument = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: '*/*'
            })
            const assets = docRes.assets
            const file = assets[0]

            const fileData = {
                name: file.name,
                uri: file.uri,
                type: file.mimeType,
                size: file.size
            }

            console.log(fileData, 'HOLAAAAAA')
            setFile(fileData)

        } catch (error) {
            console.log(error)
        }
    };

    const handleInputChange = (field, value) => {
        setNodeData({ ...nodeData, [field]: value });
    };

    const handleSubmit = async () => {
        // Validar el formulario antes de enviar los datos
        if (
            nodeData.name !== "" &&
            nodeData.title !== "" &&
            nodeData.description !== "" &&
            nodeData.typeDocument !== "" &&
            file !== null
        ) {
            const formData = new FormData()
            formData.append('filedata', file)
            formData.append('name', nodeData.name)
            formData.append('title', nodeData.title)
            formData.append('description', nodeData.description)
            formData.append('typeDocument', nodeData.typeDocument)
            if (children === null) {
                await dispatch(uploadContent({ id, ticket, formData }))
                await dispatch(getNodes({ id, ticket }))
            }
            else {
                await dispatch(uploadContent({ id: children, ticket, formData}))
                await dispatch(getNodes({ id: children, ticket }))
            }

            // Dispatch de la acción para agregar una persona
            handleClose(); // Llama a la función onSubmit para cerrar el formulario o hacer otras acciones necesarias

        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleClose}
                >
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Subir un nuevo archivo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    onChangeText={(text) => handleInputChange("name", text)}
                    value={nodeData.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Titulo"
                    onChangeText={(text) => handleInputChange("title", text)}
                    value={nodeData.title}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripcion"
                    onChangeText={(text) => handleInputChange("description", text)}
                    value={nodeData.description}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tipo de Documento"
                    onChangeText={(text) => handleInputChange("typeDocument", text)}
                    value={nodeData.typeDocument}
                />
                <Pressable style={styles.button} onPress={pickDocument}>
                    <Text style={styles.textButton}>Seleccionar archivo</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.textButton}>Crear carpeta</Text>
                </Pressable>
                
                <Pressable style={styles.buttonCancel} onPress={() => {
                    handleClose()
                    closeDropdown()
                }}>
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
        borderRadius: 15,
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
