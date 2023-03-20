import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughtsByEmotion,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import emotions, { indexOfEmotion } from "../utils/emotions";
import ThoughtList from "../components/ThoughtList";
import LoadingSpinner from "../components/LoadingSpinner";
import useError from "../hooks/useError";
import ToastManager from "toastify-react-native";
import Retry from "../components/Retry";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const validEmotion = (multiple, emotionsArr) => {
  if (!multiple) {
    return emotions.some((e) => emotions === e.value);
  } else {
    const check = [];
    for (const emotion of emotionsArr) {
      check.push(emotions.includes(emotion));
    }
    return !check.some((e) => e === false);
  }
};

const EmotionSearchScreen = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const { emotion, multiple } = route.params;
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const { searchThoughts, pages, isLoading, isError, message, errors } =
    useSelector((state) => state.thought);
  useError(
    isError ? isError : errors.search.isError,
    message ? message : errors.search.msg
  );

  useEffect(() => {
    return () => {
      dispatch(resetSearchThoughts());
    };
  }, [dispatch]);

  const emotionArray = emotion
    .trim()
    .split(" ")
    .map((emotion) => emotion.substring(1, emotion.length))
    .filter((val) => val !== "");

  if (
    isError ||
    errors.search.isError ||
    !validEmotion(multiple, emotionArray)
  ) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bc }}>
        <View
          style={{
            marginTop: 50,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: colors.font,
              fontSize: 24,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {multiple ? "Invalid emotion. " : `No result from ${emotion}. \n`}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.lightblue,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderColor: colors.lightBorder,
              borderWidth: 2,
              borderRadius: 5,
            }}
            onPress={() => {
              navigate("Search", { screen: "Intro" });
              dispatch(resetSearchThoughts());
            }}
          >
            <Text
              style={{ color: colors.font, fontSize: 24, textAlign: "center" }}
            >
              Go back to search screen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const info = {
    page: pages.search,
    emotion: emotionArray.length > 1 ? emotionArray : emotionArray[0],
    multiple: emotionArray.length > 1,
  };

  if (isLoading && pages.search === 0) return <LoadingSpinner size={"large"} />;

  const emotionObj = multiple
    ? { value: "multiple", emoji: String.fromCodePoint("0x1F921") }
    : emotions[indexOfEmotion(emotion.substring(1, emotion.length))];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bc }}>
      <ToastManager duration={4000} />
      <View style={styles.heading}>
        <Text
          style={{
            color: colors.font,
            fontSize: 38,
            textTransform: "capitalize",
          }}
        >
          {t(`emotions.${emotionObj.value}`) + emotionObj.emoji}
        </Text>
      </View>
      {!errors.search.isError ? (
        <ThoughtList
          page={pages.search}
          thoughts={searchThoughts}
          getThoughts={getThoughtsByEmotion}
          info={info}
        />
      ) : (
        <Retry />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    padding: 5,
    justifyContent: "center",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
  },
});

export default EmotionSearchScreen;
