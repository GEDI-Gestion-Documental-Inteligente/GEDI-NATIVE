import React, { useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { FormAddSiteMember } from "./FormAddSiteMember";
import { useContext } from "react";
import siteContext from "../../context/sites/siteContext";

const NavBarSiteMembers = () => {
  const { siteData } = useContext(siteContext);
  const [isMenuAccionVisible, setIsMenuAccionVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuAccionVisible(!isMenuAccionVisible);
  };

  console.log(siteData);

  return (
    <View style={styles.containerNavbar}>
      <View>
        <Text style={styles.titleNavbar}>{siteData.title}</Text>
        <Text style={styles.subtitleNavbar}>Miembros</Text>
      </View>

      <View style={styles.containerIcon}>
        <Pressable onPress={toggleMenu}>
          <AntDesign name="adduser" size={30} color="#03484c" />
        </Pressable>
      </View>

      <Modal transparent={true} visible={isMenuAccionVisible} animationType="slide">
        <FormAddSiteMember handleModal={toggleMenu} siteId={siteData.id}  />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerNavbar: {
    width: "auto",
    height: "300",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleNavbar: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#03484c",
    marginHorizontal: 5,
  },
  subtitleNavbar: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#03484c",
    marginHorizontal: 5,
  },
  containerIcon: {
    padding: 10,
  },
});

export default NavBarSiteMembers;
