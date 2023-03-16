import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughtsByUsername,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import ThoughtList from "../components/ThoughtList";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastManager from "toastify-react-native";
import useError from "../hooks/useError";
import Retry from "../components/Retry";

const UserSearchScreen = ({ route }) => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const { searchThoughts, pages, isLoading, isError, message } = useSelector(
    (state) => state.thought
  );
  useError(isError, message);

  const { username } = route.params;

  useEffect(() => {
    return () => {
      dispatch(resetSearchThoughts());
    };
  }, [dispatch]);

  const info = {
    page: pages.search,
    username: username.substring(1, username.length),
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
          {username}
        </Text>
      </View>
      {!isError ? (
        <ThoughtList
          page={pages.search}
          thoughts={searchThoughts}
          getThoughts={getThoughtsByUsername}
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
export default UserSearchScreen;
