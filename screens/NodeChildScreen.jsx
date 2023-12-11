import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FolderItem from "../components/nodes/FolderItem";
import { useDispatch, useSelector } from "react-redux";
import { getNodes } from "../redux/modules/nodes/NodeThunks";
import { getContainerDocumentLibrary } from "../redux/modules/sites/SitesThunks";
import { MenuActions } from "../components/nodes/MenuActions";
import * as Linking from "expo-linking";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import siteContext from "../context/sites/siteContext";

export const NodeChildScreen = ({ route }) => {
  const { id, siteName, path } = route.params;
  const ticket = useSelector((state) => state.auth.ticket);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nodesChildren = useSelector((state) => state.nodes.nodes);
  const resultSearch = useSelector((state) => state.nodes.searchNodes);
  const nodesChildrenMongo = useSelector((state) => state.nodes.nodesMongo);
  console.log(nodesChildrenMongo);

  const carpetas = nodesChildrenMongo.filter(
    (obj) => obj.nodeType === "cm:folder"
  );
  const contents = nodesChildrenMongo.filter(
    (obj) => obj.nodeType !== "cm:folder"
  );
  const nodesChildrenMongoSorted = carpetas.concat(contents);

  const openPDF = (path) => {
    const urlApi = process.env.EXPO_PUBLIC_API_UPLOADS;
    const url = urlApi + path;
    const viewPDF = `https://drive.google.com/viewerng/viewer?embedded=true&url=${url}`;

    Linking.openURL(viewPDF);
  };

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
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [id, ticket]);

  const handleNodePress = (node) => {
    if (node.nodeType !== "cm:folder") {
      openPDF(node.path);
    } else if (node.nodeType === "cm:folder") {
      // Navegación hacia la misma pantalla con una nueva carpeta
      navigation.push("Nodes", {
        ticket,
        id: node.id,
      });
    }
  };

  return (
    <siteContext.Provider value={{ siteName }}>
      <View style={styles.container}>
        <View>
          <MenuActions children={id} />
        </View>

        {nodesChildrenMongoSorted.length ||
        (resultSearch && resultSearch.length) ? (
          <FlatList
            style={styles.list}
            data={
              resultSearch && resultSearch.length
                ? resultSearch
                : nodesChildrenMongoSorted
            }
            renderItem={({ item }) => (
              <FolderItem node={item} onPress={() => handleNodePress(item)} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 15,
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <MaterialCommunityIcons
              name="file-document-multiple-outline"
              size={24}
              color="#808080"
            />
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "#808080", marginHorizontal: 5 }}
            >
              No se han encontrado carpetas o documentos.
            </Text>
          </View>
        )}
      </View>
    </siteContext.Provider>
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
