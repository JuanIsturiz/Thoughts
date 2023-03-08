import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
