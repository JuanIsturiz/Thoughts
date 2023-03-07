import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";

const SignUpForm = () => {
  const { navigate } = useNavigation();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = () => {
    console.log(userData.email);
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
        <Pressable
          style={styles.pressable}
          onPress={() => {
            console.log(process.env);
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "300" }}>Register</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "300",
            marginBottom: 10,
            borderBottomColor: "#000",
            borderBottomWidth: 5,
          }}
        >
          Already have an account?
        </Text>
        <Pressable style={styles.pressable}>
          <Text
            style={{ fontSize: 24, fontWeight: "300" }}
            onPress={() => navigate("Sign In")}
          >
            Go to Sign In
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    width: 350,
    marginBottom: 20,
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
