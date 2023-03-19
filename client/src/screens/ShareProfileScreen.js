import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QR from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../utils/getUserInfo";

const ShareProfileScreen = ({ route }) => {
  const { user } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const { navigate } = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedUser, setScannedUser] = useState(null);

  const onUser = (id) => {
    navigate("User Profile", { userId: id });
    setHasPermission(null);
    setScanned(false);
    setScannedUser(null);
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  const handleBarCodeScan = async ({ data }) => {
    const user = await getUserInfo(data);
    setScannedUser(user);
    setScanned(true);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bc }]}>
      <View style={styles.container}>
        <QR value={user.id} size={250} />
        <Text
          style={{ color: colors.subfont, fontSize: 36, textAlign: "center" }}
        >
          #{user.username}
        </Text>
      </View>
      {!hasPermission && (
        <View style={styles.bottom}>
          <Text style={{ fontSize: 24, color: "tomato", marginBottom: 10 }}>
            {t("share_profile.grant_access")}
          </Text>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: colors.lightblue,
              borderRadius: 5,
            }}
            onPress={() => askForCameraPermission()}
          >
            <Text style={{ fontSize: 20, color: colors.font }}>
              {t("share_profile.allow")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {hasPermission && (
        <View style={styles.bottom}>
          {!scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScan}
              style={{
                width: 250,
                height: 250,
                borderWidth: 2,
                borderColor: colors.lightblue,
              }}
            />
          )}
          {scanned && (
            <View>
              <View
                style={[styles.userInfo, { borderColor: colors.lightBorder }]}
              >
                <Text style={{ fontSize: 28, color: colors.subfont }}>
                  {t("share_profile.username")}:
                </Text>
                <Text
                  style={{ fontSize: 32, color: colors.font, marginBottom: 10 }}
                >
                  {scannedUser.username}
                </Text>
                <Text style={{ fontSize: 28, color: colors.subfont }}>
                  {t("share_profile.bio")}:
                </Text>
                <Text style={{ fontSize: 32, color: colors.font }}>
                  {scannedUser.bio}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.touchable,
                  { backgroundColor: colors.lightblue },
                ]}
                onPress={() => onUser(scannedUser._id)}
              >
                <Text style={{ fontSize: 26 }}>{t("share_profile.go_to")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.touchable, { backgroundColor: "tomato" }]}
                onPress={() => setScanned(false)}
              >
                <Text style={{ fontSize: 26 }}>
                  {t("share_profile.scan_again")}?
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    gap: 10,
    padding: 25,
    borderWidth: 2,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  touchable: {
    padding: 5,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  bottom: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
  userInfo: {
    width: 250,
    padding: 10,
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ShareProfileScreen;
