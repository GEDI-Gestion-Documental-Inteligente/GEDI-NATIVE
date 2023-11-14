import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSiteMembers } from "../../redux/modules/sites/SitesThunks";
import { StyleSheet } from "react-native";
import { SiteMemberItem } from "./SiteMemberItem";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import siteContext from "../../context/sites/siteContext";

export const SiteMembersList = () => {
  const { siteData } = useContext(siteContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const siteMembers = useSelector((state) => state.sites.siteMembers);

  useEffect(() => {
    if (siteData.id) {
      const getMembers = async () => {
        await dispatch(getSiteMembers({ ticket, siteId: siteData.id }));
      };
      getMembers();
    }
  }, [siteData]);

  return (
    <View style={styles.activityList}>
      {siteMembers.length > 0 ? (
        <FlatList
          data={siteMembers}
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Miembros del sitio</Text>
              </View>

              <View style={styles.headerTab}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("ManageSiteMembers", { siteData });
                  }}
                >
                  <Text style={styles.textTab}>Ver más</Text>
                </Pressable>
              </View>
            </View>
          }
          renderItem={({ item }) => <SiteMemberItem member={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
        />
      ) : (
        <Text style={styles.emptyText}>No se han encontrado miembros</Text>
      )}
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
  activityList: {
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#03484c",
    height: "auto",
  },
  headerTitle: { fontSize: 15, margin: 5, color: "white" },
  headerTab: {
    padding: 5,
  },
  button: {
    flexDirection: "row-reverse",
  },
  textTab: {
    fontSize: 15,
    color: "#03484c",
  },
});
