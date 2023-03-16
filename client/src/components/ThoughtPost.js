import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import emotions, { emotionTextColor, indexOfEmotion } from "../utils/emotions";
import { formatDistance } from "date-fns";
import Heart from "../icons/Heart";
import { useDispatch, useSelector } from "react-redux";
import { likeThought } from "../redux/slices/ThoughtSlice";
import { useNavigation, useTheme } from "@react-navigation/native";

const ThoughtPost = ({ thought, userPage }) => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { _id, text, emotion, userInfo, createdAt, likes } = thought;
  const [liked, setLiked] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start();

    if (likes.some((id) => id === user.id)) {
      setLiked(true);
    }
  }, []);
  const onLike = () => {
    dispatch(
      likeThought({
        id: _id,
        userId: user.id,
        action: liked ? "unlike" : "like",
      })
    ).then((res) => {
      if (res.payload.action === "like") {
        setLiked(true);
      } else if (res.payload.action === "unlike") {
        setLiked(false);
      }
    });
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.bc,
          shadowColor: colors.shadow,
          flex: userPage ? 2 : 1,
          opacity: animatedValue,
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <View style={styles.description}>
        <Text
          style={{
            color: colors.font,
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
        <TouchableOpacity onPress={onLike}>
          <Heart
            fill={liked}
            strokeColor={emotion === "fear" ? "#777" : "#333"}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.text,

            {
              color: colors.font,
              textTransform: "capitalize",
              color: emotionTextColor(emotion),
            },
          ]}
        >
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
        <View style={styles.icon_text}>
          <Text
            style={[
              styles.text,
              {
                color: colors.font,
                textTransform: "capitalize",
                color: emotionTextColor(emotion),
              },
            ]}
          >
            {emotion}
          </Text>
        </View>
        {!userPage && (
          <View style={styles.icon_text}>
            <AntDesign
              name="user"
              size={25}
              color={emotion === "fear" ? "#777" : "#333"}
            />
            <TouchableOpacity
              onPress={() =>
                navigate("User Profile", { userId: thought.userInfo.id })
              }
            >
              <Text style={[styles.text, { color: emotionTextColor(emotion) }]}>
                {userInfo.username}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
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
