import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Searchbar = () => {
  return (
    <View>
      <TextInput
        style={styles.text_input}
        placeholder="Search by user or emotion..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text_input: {
    padding: 10,
    fontSize: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 40,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: "#BCCEF8",
  },
});

export default Searchbar;
