import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FolderItem from "../components/nodes/FolderItem";
import { useDispatch, useSelector } from "react-redux";
import { getNodes } from "../redux/modules/nodes/NodeThunks";
import { getContainerDocumentLibrary } from "../redux/modules/sites/SitesThunks";
import { MenuActions } from "../components/nodes/MenuActions";

export const NodeChildScreen = ({ route }) => {
  const { id, siteName } = route.params;
  const ticket = useSelector((state) => state.auth.ticket);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nodesChildren = useSelector((state) => state.nodes.nodes);
  const resultSearch = useSelector((state) => state.nodes.searchNodes);
  const nodesChildrenMongo = useSelector((state) => state.nodes.nodesMongo);
  console.log(nodesChildrenMongo);

  const carpetas = nodesChildrenMongo.filter(obj => obj.nodeType === "cm:folder")
  const contents = nodesChildrenMongo.filter(obj => obj.nodeType !== "cm:folder")
  const nodesChildrenMongoSorted = carpetas.concat(contents);
  useEffect(() => {
    const fetchData = async () => {
      let idContainer = "";
      try {
        if (siteName) {
          idContainer = await dispatch(
            getContainerDocumentLibrary({ ticket, siteName })
          );
        }
        if (idContainer.payload != null) {
          await dispatch(getNodes({ id: idContainer.payload, ticket }));
        } else {
          await dispatch(getNodes({ id, ticket }));
          console.log(id);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData(); 
  }, [id, ticket]);

  const handleNodePress = (node) => {
    if (node.nodeType !== "cm:folder") {
      navigation.navigate("NodeContent", {
        ticket,
        id: node.id,
      });

      console.log("Se ha seleccionado un archivo:", node.name);
    } else if (node.nodeType === "cm:folder") {
      // Navegación hacia la misma pantalla con una nueva carpeta
      navigation.push("Nodes", {
        ticket,
        id: node.id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <MenuActions children={id} />
      </View>

      {nodesChildrenMongoSorted.length || (resultSearch && resultSearch.length) ? (
        <FlatList
          style={styles.list}
          data={
            resultSearch && resultSearch.length ? resultSearch : nodesChildrenMongoSorted
          }
          renderItem={({ item }) => (
            <FolderItem
              node={item}
              onPress={() => handleNodePress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No hay carpetas hijas o nodos hijos.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    backgroundColor: "#E6E7E6",
  },
  list: {
    width: "100%",
    display: "flex",
  },
});
