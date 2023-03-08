import React from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import EntyPo from "@expo/vector-icons/Entypo";

const Header = ({ onModal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thoughts</Text>
      <Pressable onPress={onModal}>
        <EntyPo name="squared-plus" size={60} color="#BCCEF8" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 36,
  },
});
export default Header;
