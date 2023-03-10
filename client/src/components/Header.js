import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EntyPo from "@expo/vector-icons/Entypo";

const Header = ({ onModal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thoughts</Text>
      <TouchableOpacity onPress={onModal}>
        <EntyPo name="squared-plus" size={60} color="#BCCEF8" />
      </TouchableOpacity>
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
