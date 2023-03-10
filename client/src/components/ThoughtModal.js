import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import { createThought } from "../redux/slices/ThoughtSlice";
import { useDispatch } from "react-redux";
import emotions, { emotionTextColor, indexOfEmotion } from "../utils/emotions";

const ThoughtModal = ({ showModal, setShowModal, userInfo }) => {
  const [text, setText] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("contempt");

  const dispatch = useDispatch();

  const onClose = () => {
    setShowModal(!showModal);
    setSelectedEmotion(emotions[0].value);
    setText("");
  };
  const onThink = async () => {
    await dispatch(
      createThought({
        text,
        emotion: selectedEmotion,
        userId: userInfo.id,
        username: userInfo.username,
        token: userInfo.token,
      })
    );

    setShowModal(false);
    setSelectedEmotion(emotions[0].value);
    setText("");
  };

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
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            What are you thinking about?
          </Text>
          <View style={styles.box}>
            <TextInput
              style={styles.textInput}
              autoFocus={true}
              multiline={true}
              value={text}
              onChangeText={(text) => setText(text)}
              placeholder="I'm thinking about cookies.."
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.picker}>
            <Picker
              itemStyle={{ fontSize: 16 }}
              selectedValue={selectedEmotion}
              onValueChange={(emotiomValue, itemIndex) =>
                setSelectedEmotion(emotiomValue)
              }
            >
              {emotions.map((emotion) => (
                <Picker.Item
                  key={emotion}
                  label={emotion.value}
                  value={emotion.value}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={[
              styles.pressable,
              {
                backgroundColor:
                  emotions[indexOfEmotion(selectedEmotion)].color,
              },
            ]}
            onPress={onThink}
          >
            <Text
              style={{ fontSize: 24, color: emotionTextColor(selectedEmotion) }}
            >
              Think It Out Loud!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 450,
    padding: 10,
    backgroundColor: "#FAF7F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 5,
    marginTop: 75,
    marginLeft: 30,
  },
  close: {
    alignItems: "flex-end",
  },
  box: {
    padding: 5,
    borderColor: "#777",
    borderWidth: 2,
    borderRadius: 5,
    height: 150,
  },
  textInput: {},
  main: {},
  picker: {
    marginTop: 10,
    fontSize: 2,
    width: 150,
    borderColor: "#777",
    borderWidth: 2,
    borderRadius: 5,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  pressable: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 5,
  },
});

export default ThoughtModal;
