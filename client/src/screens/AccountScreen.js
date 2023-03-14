import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Editable from "../components/Editable";
import PasswordModal from "../components/PasswordModal";

const AccountScreen = ({ route }) => {
  const { user } = route.params;
  const [showModal, setShowModal] = useState(false);

  const [edit, setEdit] = useState({
    username: false,
    email: false,
  });

  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
  });

  return (
    <View style={styles.container}>
      <PasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
      />
      <Editable
        input={"username"}
        initValue={user.username}
        value={userInfo.username}
        setValue={(text) =>
          setUserInfo((prev) => ({ ...prev, username: text }))
        }
        placeHolder={"Please type your new username"}
        edit={edit.username}
        setEdit={(bool) => {
          bool && setUserInfo((prev) => ({ ...prev, username: "" }));
          setEdit((prev) => ({ ...prev, username: bool }));
        }}
        trim={() =>
          setUserInfo((prev) => ({
            ...prev,
            username: userInfo.username.trim(),
          }))
        }
        user={user}
      />
      <Editable
        input={"email"}
        initValue={user.email}
        value={userInfo.email}
        setValue={(text) =>
          setUserInfo((prev) => ({ ...prev, email: text.toLowerCase() }))
        }
        placeHolder={"Please type your new email"}
        edit={edit.email}
        setEdit={(bool) => {
          bool && setUserInfo((prev) => ({ ...prev, email: "" }));
          setEdit((prev) => ({ ...prev, email: bool }));
        }}
        trim={() =>
          setUserInfo((prev) => ({
            ...prev,
            username: userInfo.email.trim(),
          }))
        }
        user={user}
      />
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text style={{ fontSize: 24, textDecorationLine: "underline" }}>
          Update Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 10,
  },
});

export default AccountScreen;
