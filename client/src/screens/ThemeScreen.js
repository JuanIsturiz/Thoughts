import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slices/GlobalSlice";

const ThemeScreen = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);
  const { t } = useTranslation("global");
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <Text style={[styles.title, { color: colors.font }]}>
        {t("theme.title")}
      </Text>
      <View style={styles.check_container}>
        <View style={styles.group}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              {
                backgroundColor:
                  theme.mode === "light" ? colors.lightblue : "transparent",
                borderColor: colors.lightBorder,
              },
            ]}
            onPress={() => {
              dispatch(setTheme("light"));
            }}
          />
          <Text style={{ color: colors.font, fontSize: 18 }}>
            {t("theme.light_option")}
          </Text>
        </View>
        <View style={styles.group}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              {
                backgroundColor:
                  theme.mode === "dark" ? colors.lightblue : "transparent",
                borderColor: colors.lightBorder,
              },
            ]}
            onPress={() => {
              dispatch(setTheme("dark"));
            }}
          />
          <Text style={{ color: colors.font, fontSize: 18 }}>
            {t("theme.dark_option")}
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

export default ThemeScreen;
