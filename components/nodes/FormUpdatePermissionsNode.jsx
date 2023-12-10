import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FormUpdateNode } from "./FormUpdateNode";
import siteContext from "../../context/sites/siteContext";
import { useDispatch, useSelector } from "react-redux";
import { getSiteMembers } from "../../redux/modules/sites/SitesThunks";
import nodeContext from "../../context/nodes/nodeContext";
import { updatePermissionsNode } from "../../redux/modules/nodes/NodeThunks";

export const FormUpdatePermissions = ({ handleModal }) => {
  const { siteName } = useContext(siteContext);
  const { node } = useContext(nodeContext);
  const dispatch = useDispatch();
  const siteMembers = useSelector((state) => state.sites.siteMembers);
  const [isModalUpdatePermissions, setIsModalUpdatePermissions] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const toggleMenu = () => {
    setIsModalUpdatePermissions(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSiteMembers({ siteId: siteName }));
    };

    fetchData();
  }, [siteName]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (siteMembers) {
      const filtered = siteMembers.filter((member) =>
        member.entry.id.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  };

  const updatePermission = async (item) => {
    console.log(item.entry.id)
    const nodeData = {
      authorityId: item.entry.id,
      name: item.entry.role,
      accessStatus: "ALLOWED",
    };
    const updatedPermission = await dispatch(
      updatePermissionsNode({ id: node.id, nodeData })
    );
    if (updatedPermission.payload) {
      console.log(updatedPermission.payload);
      alert('Se han modificado los permisos.')
      handleModal()
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        updatePermission(item);
      }}
    >
      <View style={styles.option}>
        <Text>{item.entry.person.firstName}</Text>
        <Text>{item.entry.person?.lastName}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder="Buscar a una persona del sitio"
              onChangeText={handleSearch}
              value={searchTerm}
            />
            <FlatList
              data={filteredMembers ? filteredMembers : siteMembers}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    width: 400,
    height: 300,
    margin: 10,
    marginHorizontal: 30,
  },
  modalOverlay: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    marginBottom: 65,
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    padding: 5,
  },
  option: {
    marginVertical: 10,
    flexDirection: "row",
  },
});
