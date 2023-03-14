import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { update } from "../redux/slices/AuthSlice";

const PasswordModal = ({ showModal, setShowModal, user }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onSuccess = async () => {
    if (password.includes(" ") || password2.includes(" ")) {
      alert("Invalid character detected. Please try again");
      return;
    }
    if (!password || !password2) return;
    if (password !== password2) {
      alert("Passwords doesn't match. Please try again!");
      return;
    }

    await dispatch(
      update({
        userId: user.id,
        token: user.token,
        changes: {
          password,
        },
      })
    );

    setShowModal(false);
  };

  const onClose = () => {
    setPassword("");
    setPassword2("");
    setShowModal(false);
  };
  return (
    <Modal
      animationType="slide"
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
    >
      <View
        style={[
          styles.container,
          {
            position: "absolute",
            left: windowWidth / 2 - 175,
            top: windowHeight / 2 - 125,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 22 }}>Update Password</Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>New Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Type your new password here..."
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={password2}
            onChangeText={(text) => setPassword2(text)}
            placeholder="Confirm your password here..."
            onSubmitEditing={() => {
              alert("Passwords doesn't match");
            }}
          />
        </View>
        <TouchableOpacity style={styles.touchable} onPress={onSuccess}>
          <Text style={{ fontSize: 24, color: "#FFF" }}>Update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: 350,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  textInput: {
    width: "70%",
    backgroundColor: "#EEE",
    padding: 3,
    fontSize: 18,
  },
  touchable: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "#333",
  },
});
export default PasswordModal;
