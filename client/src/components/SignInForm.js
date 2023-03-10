import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/AuthSlice";

const SignInForm = () => {
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
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ex: johndoe@gmail.com"
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
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ex: john2023$T"
          value={userData.password}
          secureTextEntry
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, password: text }))
          }
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <TouchableOpacity style={styles.pressable} onPress={signIn}>
          <Text style={{ fontSize: 28, fontWeight: "300" }}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "300",
            marginBottom: 8,
          }}
        >
          Does not have an account?
        </Text>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigate("Sign Up")}
        >
          <Text style={{ fontSize: 24, fontWeight: "300" }}>Go to Sign Up</Text>
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
