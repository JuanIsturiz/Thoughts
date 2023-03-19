import {
  Modal,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const LogoutModal = ({ showModal, setShowModal }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch(logout());
  };

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
          onPress={onLogout}
        >
          <Text style={{ fontSize: 26, color: colors.font }}>
            {t("logout_modal.logout")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchable, { backgroundColor: colors.lightblue }]}
          onPress={() => setShowModal(false)}
        >
          <Text style={{ fontSize: 26, color: colors.font }}>
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
