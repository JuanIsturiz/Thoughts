import { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { register } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(userData.email)) {
      setIsValidEmail(false);
      alert("Email is Not Valid");
    } else {
      setIsValidEmail(true);
    }
  };
  return (
    <>
      <View style={styles.view}>
        <Text style={[styles.text, { color: colors.font }]}>
          {t("signup_form.username")}
        </Text>
        <TextInput
          style={[styles.textInput, { color: colors.font }]}
          placeholder={t("signup_form.username_placeholder")}
          placeholderTextColor={colors.ph}
          value={userData.username}
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, username: text }))
          }
        />
      </View>
      <View style={styles.view}>
        <Text style={[styles.text, { color: colors.font }]}>
          {t("signup_form.email")}
        </Text>
        <TextInput
          style={[styles.textInput, { color: colors.font }]}
          placeholder={t("signup_form.email_placeholder")}
          placeholderTextColor={colors.ph}
          value={userData.email}
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, email: text }))
          }
          onSubmitEditing={validateEmail}
        />
      </View>
      <View style={styles.view}>
        <Text style={[styles.text, { color: colors.font }]}>
          {t("signup_form.password")}
        </Text>
        <TextInput
          style={[styles.textInput, { color: colors.font }]}
          placeholder={t("signup_form.password_placeholder")}
          placeholderTextColor={colors.ph}
          value={userData.password}
          secureTextEntry
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, password: text }))
          }
        />
      </View>
      <View style={styles.view}>
        <Text style={[styles.text, { color: colors.font }]}>
          {t("signup_form.confirm")}
        </Text>
        <TextInput
          style={[styles.textInput, { color: colors.font }]}
          placeholder={t("signup_form.confirm_placeholder")}
          placeholderTextColor={colors.ph}
          value={userData.password2}
          secureTextEntry
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, password2: text }))
          }
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => {
            if (!isValidEmail) return;
            dispatch(register(userData));
          }}
        >
          <Text style={{ color: colors.font, fontSize: 28, fontWeight: "300" }}>
            {t("signup_form.submit")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: colors.font,
            fontSize: 24,
            fontWeight: "300",
            marginBottom: 10,
          }}
        >
          {t("signup_form.redirect_title")}
        </Text>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigate("Sign In")}
        >
          <Text style={{ color: colors.font, fontSize: 24, fontWeight: "300" }}>
            {t("signup_form.redirect_btn")}
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
export default SignUpForm;
