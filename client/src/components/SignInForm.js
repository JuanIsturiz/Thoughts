import { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/AuthSlice";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const signIn = () => {
    dispatch(login(userData));
  };

  return (
    <>
      <View style={styles.view}>
        <Text style={[styles.text, { color: colors.font }]}>
          {t("signin_form.email")}
        </Text>
        <TextInput
          style={[styles.textInput, { color: colors.font }]}
          placeholder={t("signup_form.username_placeholder")}
          placeholderTextColor={colors.ph}
          value={userData.email}
          autoFocus={true}
          onChangeText={(text) =>
            setUserData((prev) => ({
              ...prev,
              email: text,
            }))
          }
        />
      </View>
      <View style={styles.view}>
        <Text style={[styles.text, { color: colors.font }]}>
          {t("signin_form.password")}
        </Text>
        <TextInput
          style={[styles.textInput, { color: colors.font }]}
          placeholder={t("signin_form.password_placeholder")}
          placeholderTextColor={colors.ph}
          value={userData.password}
          secureTextEntry
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, password: text }))
          }
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <TouchableOpacity style={styles.pressable} onPress={signIn}>
          <Text style={{ color: colors.font, fontSize: 28, fontWeight: "300" }}>
            {t("signin_form.submit")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: colors.font,
            fontSize: 24,
            fontWeight: "300",
            marginBottom: 8,
          }}
        >
          {t("signin_form.redirect_title")}
        </Text>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigate("Sign Up")}
        >
          <Text style={{ color: colors.font, fontSize: 24, fontWeight: "300" }}>
            {t("signin_form.redirect_btn")}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    width: 350,
    marginBottom: 15,
  },
  text: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "300",
  },
  textInput: {
    fontSize: 18,
    backgroundColor: "#bccef886",
    padding: 10,
    borderRadius: 10,
  },
  pressable: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#bccef886",
    borderRadius: 5,
  },
});
export default SignInForm;
