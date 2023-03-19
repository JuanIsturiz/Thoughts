import { View, Text, StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { useSelector } from "react-redux";
import useError from "../hooks/useError";
import ToastManager from "toastify-react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const SignUpScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");

  const { isError, message } = useSelector((state) => state.auth);

  useError(isError, message);

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <ToastManager duration={4000} />
      <Text style={[styles.title, { color: colors.font }]}>
        {t("sign_up.title")}
      </Text>
      <SignUpForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF7F0",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export default SignUpScreen;
