import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughtsByEmotion,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import emotions, { indexOfEmotion } from "../utils/emotions";
import ThoughtPost from "../components/ThoughtPost";
import { ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

const EmotionSearchScreen = ({ route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { searchThoughts } = useSelector((state) => state.thought);
  const { emotion, multiple } = route.params;
  useEffect(() => {
    const emotionArray = emotion
      .trim()
      .split(" ")
      .map((emotion) => emotion.substring(1, emotion.length))
      .filter((val) => val !== "");

    dispatch(
      getThoughtsByEmotion({
        emotion: emotionArray.length > 1 ? emotionArray : emotionArray[0],
        multiple: emotionArray.length > 1,
      })
    );
    return () => {
      dispatch(resetSearchThoughts());
    };
  }, [dispatch]);

  const emotionObj = multiple
    ? { value: "Multiple Emotions", emoji: String.fromCodePoint("0x1F921") }
    : emotions[indexOfEmotion(emotion.substring(1, emotion.length))];
  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <View style={styles.heading}>
        <Text
          style={{
            color: colors.font,
            fontSize: 38,
            textTransform: "capitalize",
          }}
        >
          {emotionObj.value + emotionObj.emoji}
        </Text>
      </View>
      <ScrollView style={{ height: 700 }}>
        <View>
          {searchThoughts.length ? (
            searchThoughts.map((thought, idx) => (
              <ThoughtPost key={idx} thought={thought} />
            ))
          ) : (
            <Text>No thoughts to show :(</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  heading: {
    paddingVertical: 5,
    justifyContent: "center",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
  },
});

export default EmotionSearchScreen;
