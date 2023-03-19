import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const EmotionSearchScreen = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const { emotion, multiple } = route.params;
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

  const emotionObj = multiple
    ? { value: "multiple", emoji: String.fromCodePoint("0x1F921") }
    : emotions[indexOfEmotion(emotion.substring(1, emotion.length))];

  const info = {
    page: pages.search,
    emotion: emotionArray.length > 1 ? emotionArray : emotionArray[0],
    multiple: emotionArray.length > 1,
  };

  if (isLoading && pages.search === 0) return <LoadingSpinner size={"large"} />;

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
