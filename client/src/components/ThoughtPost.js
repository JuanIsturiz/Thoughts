import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ThoughtPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.text}>Sample Tought Text...</Text>
      </View>
      <View style={styles.footer}>
        <AntDesign name="hearto" size={25} />
        <View style={styles.icon_text}>
          <View style={styles.emotion}></View>
          <Text style={styles.text}>Sample Emotion</Text>
        </View>
        <View style={styles.icon_text}>
          <AntDesign name="user" size={25} color="#98A8F8" />
          <Text style={styles.text}>Sample User</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
  description: {
    marginBottom: 10,
  },
  emotion: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 50,
  },
  icon_text: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ThoughtPost;
