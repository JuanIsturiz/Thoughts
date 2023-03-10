import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import emotions, { indexOfEmotion } from "../utils/emotions";
import { formatDistance } from "date-fns";

const ThoughtPost = ({ thought, userPage }) => {
  const { id, text, emotion, userInfo, createdAt } = thought;

  return (
    <View style={[styles.container, { flex: userPage ? 2 : 1 }]}>
      <View style={styles.description}>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={[
          styles.footer,
          { backgroundColor: emotions[indexOfEmotion(emotion)].color },
        ]}
      >
        <AntDesign name="hearto" size={25} color="#333" />
        <Text style={[styles.text, { textTransform: "capitalize" }]}>
          {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
        </Text>
        <View style={styles.icon_text}>
          <Text style={[styles.text, { textTransform: "capitalize" }]}>
            {emotion}
          </Text>
        </View>
        {!userPage && (
          <View style={styles.icon_text}>
            <AntDesign name="user" size={25} color="#333" />
            <Text style={styles.text}>{userInfo.username}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
  description: {
    padding: 10,
    paddingBottom: 0,
    marginBottom: 10,
  },
  emotion: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#333",
  },
  icon_text: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#555",
    paddingVertical: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ThoughtPost;
