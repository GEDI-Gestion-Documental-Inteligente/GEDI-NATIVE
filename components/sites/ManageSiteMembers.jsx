import React, { useEffect } from "react";
import { Text, FlatList, View, StyleSheet, Pressable } from "react-native";
import {
  getSiteMembers,
  updateSiteMemberRole,
} from "../../redux/modules/sites/SitesThunks";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useContext } from "react";
import siteContext from "../../context/sites/siteContext";
import { Modal } from "react-native";
import { ModalRemoveSiteMember } from "./ModalRemoveSiteMember";

export const ManageSiteMembers = () => {
  const { siteData } = useContext(siteContext);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const siteMembers = useSelector((state) => state.sites.siteMembers);
  const [newRole, setNewRole] = useState("");
  const [isMenuAccionVisible, setIsMenuAccionVisible] = useState(false);

  const toggleMenu = (memberId) => {
    setSelectedMemberId(memberId);
    setIsMenuAccionVisible(!isMenuAccionVisible);
  };

  useEffect(() => {
    if (siteData.id) {
      const getMembers = async () => {
        await dispatch(getSiteMembers({ ticket, siteId: siteData.id }));
      };
      getMembers();
    }
  }, [siteData]);

  const changeSelectedRole = async (personId, newRole) => {
    await dispatch(
      updateSiteMemberRole({ ticket, siteId: siteData.id, personId, newRole })
    );
    alert("Se ha cambiado el rol del usuario correctamente")

    await dispatch(getSiteMembers({ ticket, siteId: siteData.id }));
  };

  const SiteMember = ({ member }) => {
    return (
      <View style={styles.item}>
        <View style={styles.leftContainer}>
          {/* <View style={styles.icon}>
            <AntDesign name="user" size={22} color="#03484c" />
          </View> */}
          <Text style={styles.memberName}>
            {member.entry.person.firstName} {member.entry.person.lastName}
          </Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={member.entry.role}
            onValueChange={(itemValue) =>
              changeSelectedRole(member.entry.id, itemValue)
            }
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Consumidor" value="SiteConsumer" />
            <Picker.Item label="Colaborador" value="SiteCollaborator" />
            <Picker.Item label="Contribuidor" value="SiteContributor" />
            <Picker.Item label="Manager" value="SiteManager" />
          </Picker>
          <Pressable onPress={() => toggleMenu(member.entry.id)}>
            <AntDesign name="delete" size={24} color="#03484c" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {siteMembers.length > 0 ? (
        <FlatList
          data={siteMembers}
          renderItem={({ item }) => <SiteMember member={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
        />
      ) : (
        <Text style={styles.emptyText}>No se han encontrado miembros</Text>
      )}

      <Modal
        transparent={true}
        visible={isMenuAccionVisible}
        animationType="slide"
      >
        <ModalRemoveSiteMember
          handleModal={toggleMenu}
          idSiteMember={selectedMemberId}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 16,
    color: "#888888",
    alignSelf: "center",
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginEnd: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "normal",
  },
  pickerContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  picker: {
    width: 170,
  },
});
