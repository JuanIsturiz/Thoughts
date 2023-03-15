import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const SignUpScreen = () => {
  const { t } = useTranslation("global");
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
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
    marginVertical: 5,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export default SignUpScreen;
