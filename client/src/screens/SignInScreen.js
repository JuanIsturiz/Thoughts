import { View, Text, StyleSheet } from "react-native";
import SignInForm from "../components/SignInForm";
import { useSelector } from "react-redux";
import useError from "../hooks/useError";
import ToastManager from "toastify-react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const SignInScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");

  const { isError, message } = useSelector((state) => state.auth);

  useError(isError, message);

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <ToastManager />
      <Text style={[styles.title, { color: colors.font }]}>
        {t("sign_in.title")}
      </Text>
      <SignInForm />
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
  input: {},
});

export default SignInScreen;
