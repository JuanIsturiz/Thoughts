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
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const PasswordModal = ({ showModal, setShowModal, user }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onSuccess = async () => {
    if (password.includes(" ") || password2.includes(" ")) {
      alert(t("password_modal.space_alert"));
      return;
    }
    if (!password || !password2) return;
    if (password !== password2) {
      alert(t("password_modal.unmatch_alert"));
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
            backgroundColor: colors.bc,
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
          <Text style={{ color: colors.font, fontSize: 22 }}>
            {t("password_modal.update")}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" color={colors.font} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: colors.font, fontSize: 22, marginBottom: 2 }}>
            {t("password_modal.new")}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { color: colors.font, backgroundColor: colors.lightBorder },
            ]}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={t("password_modal.new_placeholder")}
            placeholderTextColor={colors.ph}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: colors.font, fontSize: 22, marginBottom: 2 }}>
            {t("password_modal.confirm")}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { color: colors.font, backgroundColor: colors.lightBorder },
            ]}
            secureTextEntry
            value={password2}
            onChangeText={(text) => setPassword2(text)}
            placeholder={t("password_modal.confirm_placeholder")}
            placeholderTextColor={colors.ph}
            onSubmitEditing={() => {
              alert(t("password_modal.confirm_submit_alert"));
            }}
          />
        </View>
        <TouchableOpacity
          style={[styles.touchable, { backgroundColor: colors.lightblue }]}
          onPress={onSuccess}
        >
          <Text style={{ fontSize: 24, color: colors.font }}>Update</Text>
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
    fontSize: 20,
  },
  touchable: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
  },
});
export default PasswordModal;
