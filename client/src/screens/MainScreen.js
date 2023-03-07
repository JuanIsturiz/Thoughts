import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MainLogo from "../icons/MainLogo";
import { LinearGradient } from "expo-linear-gradient";

const MainScreen = () => {
  return (
    <LinearGradient
      colors={["#FAF7F0", "#BCCEF8", "#BDCEF8"]}
      style={styles.container}
    >
      <View style={{ marginBottom: 200 }}>
        <MainLogo />
      </View>
      <Text
        style={{
          marginBottom: 50,
          fontSize: 32,
        }}
      >
        By Juan Isturiz
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default MainScreen;
