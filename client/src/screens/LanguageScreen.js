import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/slices/GlobalSlice";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const LanguageScreen = () => {
  const { colors } = useTheme();
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.global);

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <Text style={[styles.title, { color: colors.font }]}>
        {t("language.title")}
      </Text>
      <View style={styles.check_container}>
        <View style={styles.group}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              {
                backgroundColor:
                  language === "en" ? colors.lightblue : "transparent",
                borderColor: colors.lightBorder,
              },
            ]}
            onPress={async () => {
              await dispatch(setLanguage("en"));
              i18n.changeLanguage("en");
            }}
          />
          <Text style={{ color: colors.font, fontSize: 18 }}>
            {t("language.en_option")}
          </Text>
        </View>
        <View style={styles.group}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              {
                backgroundColor:
                  language === "es" ? colors.lightblue : "transparent",
                borderColor: colors.lightBorder,
              },
            ]}
            onPress={async () => {
              await dispatch(setLanguage("es"));
              i18n.changeLanguage("es");
            }}
          />
          <Text style={{ color: colors.font, fontSize: 18 }}>
            {t("language.es_option")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  check_container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  group: {
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    width: 35,
    height: 35,
    borderWidth: 1.5,
    borderRadius: 5,
  },
});

export default LanguageScreen;
