import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import DeleteTrashcan from "./DeleteTrashcan";
import LoadingSpinner from "./LoadingSpinner";
import ThoughtPost from "./ThoughtPost";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const ThoughtList = ({ page, thoughts, getThoughts, info, userPage }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const dispatch = useDispatch();

  const [end, setEnd] = useState(false);
  const [endCheck, setEndCheck] = useState(false);

  useEffect(() => {
    if (page > 0) return;
    dispatch(getThoughts(info ? info : page));
  }, [dispatch]);

  const onEnd = () => {
    if (page === 0) return;
    if (end) {
      setEndCheck(true);
      setTimeout(() => {
        setEndCheck(false);
      }, 2000);
      return;
    }
    if (endCheck) return;
    setEndCheck(true);
    dispatch(getThoughts(info ? info : page)).then((res) => {
      if (res.payload.end) {
        setEnd(true);
      }
      setEndCheck(false);
    });
  };

  return (
    <FlatList
      style={{ paddingHorizontal: 10 }}
      data={thoughts}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      onEndReached={onEnd}
      ListFooterComponent={
        !end ? (
          <LoadingSpinner size={"large"} />
        ) : (
          <Text
            style={{
              color: colors.font,
              fontSize: 24,
              padding: 4,
              textAlign: "center",
            }}
          >
            {t("thoughtlist.end")}
          </Text>
        )
      }
      ListFooterComponentStyle={{
        opacity: thoughts && endCheck && page > 0 ? 1 : 0,
      }}
      ListEmptyComponent={
        <Text style={{ color: colors.font, padding: 5, textAlign: "center" }}>
          {t("thoughtlist.not_found")}
        </Text>
      }
      keyExtractor={(item) => item._id}
      renderItem={({ item }) =>
        !userPage ? (
          <ThoughtPost thought={item} />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ThoughtPost thought={item} userPage={true} />
            <DeleteTrashcan thoughtId={item._id} />
          </View>
        )
      }
    />
  );
};

const ThoughtListFooter = ({ msg }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        color: colors.font,
        fontSize: 24,
        padding: 10,
        textAlign: "center",
      }}
    >
      {msg}
    </Text>
  );
};

export default ThoughtList;
