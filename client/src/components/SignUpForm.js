import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { register } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
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
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ex: john-doe"
          value={userData.username}
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, username: text }))
          }
        />
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ex: johndoe@gmail.com"
          value={userData.email}
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, email: text }))
          }
          onSubmitEditing={validateEmail}
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
      <View style={styles.view}>
        <Text style={styles.text}>Password Confirmation</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ex: john2023$T"
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
          <Text style={{ fontSize: 28, fontWeight: "300" }}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "300",
            marginBottom: 10,
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigate("Sign In")}
        >
          <Text style={{ fontSize: 24, fontWeight: "300" }}>Go to Sign In</Text>
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
