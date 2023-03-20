import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughtsByUsername,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import { useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import ThoughtList from "../components/ThoughtList";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastManager from "toastify-react-native";
import useError from "../hooks/useError";
import Retry from "../components/Retry";
import { TouchableOpacity } from "react-native";

const UserSearchScreen = ({ route }) => {
  const { colors } = useTheme();
  const { username } = route.params;
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

  if (errors.search.isError) {
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
            {`No result found for ${username}`}
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
      {!errors.search.isError ? (
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
