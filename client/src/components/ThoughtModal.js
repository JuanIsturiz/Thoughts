import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Modal, View, Text, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ThoughtModal = ({ showModal, setShowModal }) => {
  const [text, setText] = useState("");
  return (
    <Modal
      animationType="fade"
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowModal(!showModal);
      }}
    >
      <View style={styles.container}>
        <View style={styles.close}>
          <Pressable onPress={() => setShowModal(!showModal)}>
            <AntDesign name="close" color="#000" size={30} />
          </Pressable>
        </View>
        <View style={styles.main}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            What are you thinking about?
          </Text>
          <View style={styles.box}>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={(text) => setText(text)}
            ></TextInput>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 350,
    padding: 10,
    backgroundColor: "#FAF7F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 5,
    marginTop: 75,
    marginHorizontal: "auto",
  },
  close: {
    alignItems: "flex-end",
  },
  box: {
    padding: 5,
    borderColor: "#222",
    borderWidth: 2,
    borderRadius: 5,
    height: 200,
  },
  textInput: {},
  main: {},
});

export default ThoughtModal;
