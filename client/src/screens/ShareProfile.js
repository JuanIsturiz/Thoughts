import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QR from "react-native-qrcode-svg";
// !Fix QR code stuff
const ShareProfile = ({ route }) => {
  const { user } = route.params;
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <QR value="https://www.youtube.com/" size={250} />
        <Text style={{ fontSize: 36, textAlign: "center" }}>
          #{user.username}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    gap: 10,
    padding: 25,
    borderWidth: 2,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
  },
});

export default ShareProfile;
