import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PeopleItem } from "./PeopleItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPeople } from "../../redux/modules/people/peopleThunks";
import { PeopleSearch } from "./PeopleSearch";
import { PeopleMenuButton } from "./PeopleMenuButton";

export const PeopleList = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const data = useSelector((state) => state.people.people);
  const searchResult = useSelector((state) => state.people.searchPeople);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        await dispatch(getPeople({ ticket }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPeople();
  }, []);

  return (
    <View>
      <View style={styles.containerHeader}>
        <PeopleSearch />
        <PeopleMenuButton />
      </View>

      {data.length > 0 && (
        <FlatList
          data={searchResult && searchResult.length ? searchResult : data}
          keyExtractor={(item) => item.entry.id}
          renderItem={({ item }) => <PeopleItem people={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader:{
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: 'center'
  }
})