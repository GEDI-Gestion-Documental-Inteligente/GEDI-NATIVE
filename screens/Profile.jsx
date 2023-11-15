import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getOnePerson } from "../redux/modules/people/peopleThunks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const Profile = () => {
  const userId = useSelector((state) => state.auth.user);
  const ticket = useSelector((state) => state.auth.ticket);
  const personLoggued = useSelector((state) => state.people.person);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(personLoggued);

  useEffect(() => {
    const fetchPerson = async () => {
      const person = await dispatch(getOnePerson({ ticket, idPerson: userId }));
      setData(person);
    };

    fetchPerson();
  }, []);

  useEffect(() => {
    setData(personLoggued);
  }, [personLoggued]);

  return (
    <View style={styles.container}>
      <View style={styles.profileInformation}>
        <View style={styles.headerProfile}>
          <MaterialCommunityIcons
            name="face-woman-outline"
            size={130}
            color="#03484c"
          />
        </View>

        <View style={styles.informationContainer}>
          <View style={styles.itemInfo}>
            <FontAwesome5
              name="user-edit"
              size={24}
              color="#03484c"
              style={styles.icon}
            />
            <TextInput>
              <Text style={styles.detail}>Editar perfil</Text>
            </TextInput>
          </View>
          <View style={styles.itemInfo}>
            <Entypo name="lock" size={24} color="#03484c" style={styles.icon} />

            <TextInput>
              <Text style={styles.detail}>Cambiar contraseña</Text>
            </TextInput>
          </View>

          <View style={styles.itemInfo}>
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="#03484c"
              style={styles.icon}
            />
            <Text style={styles.detail}>Información</Text>
          </View>

          <View style={styles.itemInfo}>
            <FontAwesome5
              name="user-lock"
              size={24}
              color="#03484c"
              style={styles.icon}
            />
            <Text style={styles.detail}>Cerrar sesión</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInformation: {
    backgroundColor: "white",
    height: "100%",
  },
  headerProfile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    top: 30,
  },
  informationContainer: {
    padding: 15,
    top: 30,
  },
  detail: {
    fontSize: 20,
    color: "black",
  },
  itemInfo: {
    flexDirection: "row",
    width: "90%",
    marginVertical: 30,
  },
  icon: {
    marginHorizontal: 5,
  },
});
