import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { resetThought } from "../redux/slices/ThoughtSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const Retry = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");

  const dispatch = useDispatch();

  const onSubmit = async () => {
    await dispatch(resetThought());
  };

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
      onPress={onSubmit}
    >
      <Text style={{ fontSize: 24 }}>{t("retry.text")}</Text>
    </TouchableOpacity>
  );
};

export default Retry;
