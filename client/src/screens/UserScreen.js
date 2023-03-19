import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";
import { getThoughtsByUser } from "../redux/slices/ThoughtSlice";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ThoughtList from "../components/ThoughtList";
import LoadingSpinner from "../components/LoadingSpinner";
import useError from "../hooks/useError";
import ToastManager from "toastify-react-native";
import Retry from "../components/Retry";

const UserScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  const { navigate } = useNavigation();

  const { user } = useSelector((state) => state.auth);
  const { userThoughts, pages, isLoading, isError, message, errors } =
    useSelector((state) => state.thought);

  useError(
    isError ? isError : errors.user.isError,
    message ? message : errors.user.msg
  );

  const info = {
    userId: user.id,
    page: pages.user,
  };

  if (isLoading && pages.user === 0) return <LoadingSpinner size={"large"} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bc }}>
      <ToastManager duration={4000} />
      <View
        style={[
          styles.header,
          { backgroundColor: colors.bc, borderBottomColor: colors.lightBorder },
        ]}
      >
        <Text style={[styles.header_title, { color: colors.font }]}>
          {t("user.header")}
        </Text>
      </View>
      <View style={styles.user_info}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <Text style={{ color: colors.font, fontSize: 32 }}>
            {user ? user.username : "Sample User"}
          </Text>
          <TouchableOpacity onPress={() => navigate("Configuration")}>
            <Feather name="settings" size={30} color={colors.lightblue} />
          </TouchableOpacity>
        </View>
        <View style={[styles.description, { borderColor: colors.lightBorder }]}>
          <Text
            style={{
              color: colors.font,
              fontSize: 18,
            }}
          >
            {user.bio}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {!errors.user.isError ? (
          <ThoughtList
            page={pages.user}
            thoughts={userThoughts}
            getThoughts={getThoughtsByUser}
            info={info}
            userPage={true}
          />
        ) : (
          <Retry get={getThoughtsByUser} info={info} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  header: {
    height: 72,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  header_title: {
    fontSize: 36,
  },
  user_info: {
    marginVertical: 15,
    marginHorizontal: 20,
    marginTop: 50,
    alignItems: "center",
  },
  description: {
    width: 325,
    padding: 7,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
  },
});

export default UserScreen;
