import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParam } from "../redux/slices/ThoughtSlice";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
  const { colors } = useTheme();

  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const { searchParam } = useSelector((state) => state.thought);
  const { navigate } = useNavigation();
  const onSubmit = () => {
    if (searchParam === "") return;
    if (searchParam.includes("#") && searchParam.includes("@")) {
      console.log("invalid searchParam");
      return;
    }
    if (searchParam.includes("#")) {
      navigate("Emotion", {
        emotion: searchParam.trim(),
        multiple: searchParam.trim().includes(" "),
      });
    }
    if (searchParam.includes("@")) {
      navigate("User", { username: searchParam.trim() });
    }
    dispatch(setSearchParam({ text: "" }));
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.bc, borderColor: colors.lightBorder },
      ]}
    >
      <TextInput
        style={[
          styles.text_input,
          { color: colors.font, borderRightColor: colors.ph },
        ]}
        placeholder={t("searchbar.placeholder")}
        placeholderTextColor={colors.ph}
        onChangeText={(text) => dispatch(setSearchParam({ text }))}
        onSubmitEditing={onSubmit}
        value={searchParam}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Fontisto name="zoom" size={30} color={colors.ph} />
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
    width: 310,
    fontSize: 24,
  },
});

export default Searchbar;
