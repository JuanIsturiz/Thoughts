import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParam } from "../redux/slices/ThoughtSlice";

const Searchbar = () => {
  const dispatch = useDispatch();
  const { searchParam } = useSelector((state) => state.thought);
  const { navigate } = useNavigation();
  const onSubmit = () => {
    if (searchParam === "") return;
    navigate("Emotion", {
      emotion: searchParam.trim(),
      multiple: searchParam.trim().includes(" "),
    });
    dispatch(setSearchParam({ text: "" }));
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text_input}
        placeholder="Search by @user or #emotion..."
        onChangeText={(text) => dispatch(setSearchParam({ text }))}
        onSubmitEditing={onSubmit}
        value={searchParam}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Fontisto name="zoom" size={30} color="#DDD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 40,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: "#BCCEF8",
  },
  text_input: {
    paddingRight: 5,
    borderRightWidth: 2,
    borderRightColor: "#DDD",
    width: 310,
    fontSize: 24,
  },
});

export default Searchbar;
