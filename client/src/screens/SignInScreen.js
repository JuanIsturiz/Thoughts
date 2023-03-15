import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import SignInForm from "../components/SignInForm";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const SignInScreen = () => {
  const { t } = useTranslation("global");
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
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
    marginVertical: 5,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {},
});

export default SignInScreen;
