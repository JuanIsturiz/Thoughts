import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import SignInForm from "../components/SignInForm";

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
