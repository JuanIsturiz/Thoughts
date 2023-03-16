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
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const ThoughtModal = ({ showModal, setShowModal, userInfo }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const [text, setText] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("contempt");

  const dispatch = useDispatch();

  const onClose = () => {
    setShowModal(!showModal);
    setSelectedEmotion(emotions[0].value);
    setText("");
  };
  const onThink = async () => {
    if (!text) return;
    await dispatch(
      createThought({
        text: text.trim(),
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
        setShowModal(!showModal);
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.bc,
          },
        ]}
      >
        <View style={styles.close}>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <Text style={{ color: colors.font, fontSize: 16, marginBottom: 5 }}>
            {t("thought_modal.question")}
          </Text>
          <View style={styles.box}>
            <TextInput
              style={[styles.textInput, { color: colors.font }]}
              autoFocus={true}
              multiline={true}
              value={text}
              onChangeText={(text) => setText(text)}
              placeholder={t("thought_modal.placeholder")}
              placeholderTextColor={colors.ph}
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
              {emotions.map((emotion, idx) => (
                <Picker.Item
                  key={idx}
                  label={emotion.value}
                  value={emotion.value}
                  color={colors.font}
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
              style={{
                color: colors.font,
                fontSize: 24,
                color: emotionTextColor(selectedEmotion),
              }}
            >
              {t("thought_modal.submit")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FAF7F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 5,
    marginTop: 55,
    marginHorizontal: 15,
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
