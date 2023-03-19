import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import LogoutModal from "../components/LogoutModal";
import { useSelector } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const { navigate } = useNavigation();

  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.section}>
        <Text style={[styles.section_title, { color: colors.font }]}>
          {t("settings.account")}
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => navigate("Account", { user })}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.account_opt")}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => navigate("Share Profile", { user })}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.share_profile_opt")}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => navigate("Liked", { userId: user.id })}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.liked_opt")}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.section_title, { color: colors.font }]}>
          {t("settings.display")}
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => navigate("Language")}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.language_opt")}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => navigate("Theme")}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.theme_opt")}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.section_title, { color: colors.font }]}>
          {t("settings.about")}
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => navigate("Copyright")}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.copyright_opt") + " \u00A9"}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.section_title, { color: colors.font }]}>
          {t("settings.login")}
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: colors.lightblue }]}
            onPress={() => setShowModal(true)}
          >
            <Text style={[styles.option_title, { color: colors.font }]}>
              {t("settings.sign_out_opt")}
            </Text>
            <Entypo name="chevron-right" size={32} color={colors.font} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  option: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#BCCEF8",
    borderRadius: 5,
  },
  section_title: { fontSize: 26, fontWeight: 500, marginBottom: 5 },
  option_title: { fontSize: 18, fontWeight: 500 },
});

export default SettingsScreen;
