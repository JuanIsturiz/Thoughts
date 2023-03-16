import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Editable from "../components/Editable";
import PasswordModal from "../components/PasswordModal";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const AccountScreen = ({ route }) => {
  const { t } = useTranslation("global");
  const { colors } = useTheme();
  const { user } = route.params;
  const [showModal, setShowModal] = useState(false);

  const [edit, setEdit] = useState({
    username: false,
    email: false,
  });

  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <PasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
      />
      <Editable
        title={t("account.username_title")}
        input={"username"}
        initValue={user.username}
        value={userInfo.username}
        setValue={(text) =>
          setUserInfo((prev) => ({ ...prev, username: text }))
        }
        placeHolder={t("account.username_placeholder")}
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
        title={t("account.email_title")}
        input={"email"}
        initValue={user.email}
        value={userInfo.email}
        setValue={(text) =>
          setUserInfo((prev) => ({ ...prev, email: text.toLowerCase() }))
        }
        placeHolder={t("account.email_placeholder")}
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

      <Editable
        title={t("account.bio_title")}
        input={"bio"}
        initValue={user.bio}
        value={userInfo.bio}
        setValue={(text) =>
          setUserInfo((prev) => ({ ...prev, bio: text.toLowerCase() }))
        }
        placeHolder={t("account.bio_placeholder")}
        edit={edit.bio}
        setEdit={(bool) => {
          bool && setUserInfo((prev) => ({ ...prev, bio: "" }));
          setEdit((prev) => ({ ...prev, bio: bool }));
        }}
        trim={() =>
          setUserInfo((prev) => ({
            ...prev,
            username: userInfo.bio.trim(),
          }))
        }
        user={user}
        multi={true}
      />

      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text
          style={{
            color: colors.font,
            fontSize: 24,
            textDecorationLine: "underline",
          }}
        >
          {t("account.update_password")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  textInput: {
    width: 350,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default AccountScreen;
