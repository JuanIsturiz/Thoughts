import { useTheme } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Modal, TouchableOpacity, View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";

const LogoutModal = ({ showModal, setShowModal }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
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
            borderColor: colors.lightBorder,
            left: windowWidth / 2 - 150,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.touchable, { backgroundColor: "#f08080" }]}
          onPress={() => dispatch(logout())}
        >
          <Text style={{ fontSize: 26, color: "#FFF" }}>
            {t("logout_modal.logout")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchable, { backgroundColor: "#CCC" }]}
          onPress={() => setShowModal(false)}
        >
          <Text style={{ fontSize: 26, color: "#FFF" }}>
            {t("logout_modal.cancel")}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 50,
    width: 300,
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 5,
    gap: 5,
  },
  touchable: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default LogoutModal;
