import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import ThoughtList from "../components/ThoughtList";
import ThoughtModal from "../components/ThoughtModal";
import { getFeedThoughts } from "../redux/slices/ThoughtSlice";
import ToastManager from "toastify-react-native";
import useError from "../hooks/useError";
import Retry from "../components/Retry";
import { useTheme } from "@react-navigation/native";

const FeedScreen = () => {
  const { colors } = useTheme();
  const { feedThoughts, pages, isLoading, isError, message, errors } =
    useSelector((state) => state.thought);

  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useError(
    isError ? isError : errors.feed.isError,
    message ? message : errors.feed.msg
  );

  if (isLoading && pages.feed === 0) return <LoadingSpinner size={"large"} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bc }}>
      <ToastManager duration={4000} />
      <Header onModal={() => setShowModal((prev) => !prev)} />
      <ThoughtModal
        showModal={showModal}
        setShowModal={setShowModal}
        userInfo={{ id: user.id, username: user.username, token: user.token }}
      />
      {!errors.feed.isError ? (
        <ThoughtList
          page={pages.feed}
          thoughts={feedThoughts}
          getThoughts={getFeedThoughts}
        />
      ) : (
        <Retry />
      )}
    </View>
  );
};

export default FeedScreen;
