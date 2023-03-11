import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { getThoughtsByEmotion } from "../redux/slices/ThoughtSlice";
import emotions, { indexOfEmotion } from "../utils/emotions";

const EmotionScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { emotion, multiple } = route.params;
  const onFetch = () => {
    const emotionArray = emotion
      .trim()
      .split(" ")
      .map((emotion) => emotion.substring(1, emotion.length))
      .filter((val) => val !== "");
    console.log({
      emotion: emotionArray.length > 1 ? emotionArray : emotionArray[0],
      multiple: emotionArray.length > 1,
    });

    //   dispatch(
    //   getThoughtsByEmotion({
    //     emotion: emotionArray.length > 1 ? emotionArray : emotionArray[0],
    //     multiple: emotionArray.length > 1,
    //   })
    // );
  };
  const emotionObj = multiple
    ? { value: "Multiple Emotions", emoji: String.fromCodePoint("0x1F921") }
    : emotions[indexOfEmotion(emotion.substring(1, emotion.length))];
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={{ fontSize: 38, textTransform: "capitalize" }}>
          {emotionObj.value + emotionObj.emoji}
        </Text>
      </View>
      <Button onPress={onFetch} title="Fetch Thoughts By Emotion" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  heading: {
    paddingVertical: 5,
    justifyContent: "center",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
  },
});

export default EmotionScreen;
