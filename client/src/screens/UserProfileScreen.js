import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "@react-navigation/native";
import ThoughtList from "../components/ThoughtList";
import {
  getThoughtsByUsername,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import { useDispatch, useSelector } from "react-redux";
import ToastManager, { Toast } from "toastify-react-native";
import useError from "../hooks/useError";
import { useTranslation } from "react-i18next";
import Retry from "../components/Retry";
import { getUserInfo } from "../utils/getUserInfo";

const UserProfileScreen = ({ route }) => {
  const { t } = useTranslation("global");
  const { colors } = useTheme();
  const { userId } = route.params;

  const dispatch = useDispatch();
  const { searchThoughts, pages, isLoading, isError, message, errors } =
    useSelector((state) => state.thought);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useError(
    isError ? isError : errors.search.isError,
    message ? message : errors.search.msg
  );

  useEffect(() => {
    setLoading(true);
    getUserInfo(userId)
      .then((res) => {
        setError(false);
        setLoading(false);
        setUser(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        Toast.error(err);
      });
    return () => {
      dispatch(resetSearchThoughts());
    };
  }, []);

  if (loading || (isLoading && pages.search === 0))
    return <LoadingSpinner size={"large"} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bc }}>
      <ToastManager duration={4000} />

      <View style={[styles.userInfo, { borderColor: colors.lightBorder }]}>
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.title, { color: colors.subfont }]}>
            {t("user_profile.username")}
          </Text>
          <Text style={[styles.info, { color: colors.font }]}>
            {user ? user.username : "..."}
          </Text>
        </View>
        <View>
          <Text style={[styles.title, { color: colors.subfont }]}>
            {t("user_profile.bio")}
          </Text>
          <Text style={[styles.info, { color: colors.font }]}>
            {user ? user.bio : "..."}
          </Text>
        </View>
      </View>
      {user && !error ? (
        <ThoughtList
          page={pages.search}
          thoughts={searchThoughts}
          getThoughts={getThoughtsByUsername}
          info={{ page: pages.search, username: user.username }}
        />
      ) : (
        <Retry />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    marginTop: 20,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  info: {
    fontSize: 24,
  },
});

export default UserProfileScreen;
