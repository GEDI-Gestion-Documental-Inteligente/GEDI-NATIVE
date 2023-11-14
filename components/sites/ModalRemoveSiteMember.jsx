import { useContext } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import siteContext from "../../context/sites/siteContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSiteMember,
  getSiteMembers,
} from "../../redux/modules/sites/SitesThunks";
import { TouchableOpacity } from "react-native";

export const ModalRemoveSiteMember = ({ idSiteMember, handleModal }) => {
  const { siteData } = useContext(siteContext);
  const ticket = useSelector((state) => state.auth.ticket);
  const dispatch = useDispatch();
  const removeSiteMember = async () => {
    await dispatch(
      deleteSiteMember({
        ticket,
        siteId: siteData.id,
        personId: idSiteMember,
      })
    );
    await dispatch(getSiteMembers({ ticket, siteId: siteData.id }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <Text style={styles.title}>Eliminar miembro</Text>
        <Text style={styles.text}>
          ¿Desea quitar a este usuario del sitio {siteData.title}?
        </Text>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.buttonCancel} onPress={handleModal}>
            <Text style={styles.textButton}>Cancelar</Text>
          </Pressable>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              removeSiteMember();
              handleModal();
            }}
          >
            <Text style={styles.textButton}>Aceptar</Text>
          </TouchableOpacity>
        </View>
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
    height: 350,
    width: 350,
    justifyContent: "space-between",
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
    marginHorizontal: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
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
    marginHorizontal: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
  },
});
