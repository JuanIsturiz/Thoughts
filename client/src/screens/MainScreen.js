import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import MainLogo from "../icons/MainLogo";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  const animatedValue = useState(new Animated.Value(1))[0];
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          useNativeDriver: true,
          toValue: 1.1,
          duration: 1750,
          easing: Easing.ease,
        }),
        Animated.timing(animatedValue, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1750,
          easing: Easing.ease,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, []);
  const { navigate } = useNavigation();
  return (
    <LinearGradient
      colors={["#FAF7F0", "#BCCEF8", "#BDCEF8"]}
      style={styles.container}
    >
      <Animated.View
        style={{
          marginBottom: 50,
          transform: [
            {
              scale: animatedValue,
            },
          ],
        }}
      >
        <MainLogo />
      </Animated.View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 30,
          marginBottom: 125,
        }}
      >
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigate("Sign Up")}
        >
          <Text style={{ fontSize: 38 }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => navigate("Sign In")}
        >
          <Text style={{ fontSize: 38 }}>Log In</Text>
        </TouchableOpacity>
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
  pressable: {
    padding: 10,
    backgroundColor: "rgba(000, 000, 255, 0.1)",
    borderRadius: 5,
  },
});

export default MainScreen;
