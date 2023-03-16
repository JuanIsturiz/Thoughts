import { useTheme } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { resetThought } from "../redux/slices/ThoughtSlice";

const Retry = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.lightblue,
        margin: 20,
        padding: 10,
        alignSelf: "center",
        justifySelf: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.ligthBorder,
      }}
      onPress={() => dispatch(resetThought())}
    >
      <Text style={{ fontSize: 24 }}>{t("retry.text")}</Text>
    </TouchableOpacity>
  );
};

export default Retry;
