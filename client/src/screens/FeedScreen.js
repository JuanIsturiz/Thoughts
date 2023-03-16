import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import ThoughtList from "../components/ThoughtList";
import ThoughtModal from "../components/ThoughtModal";
import { getAllThoughts, resetThought } from "../redux/slices/ThoughtSlice";
import ToastManager, { Toast } from "toastify-react-native";
import useError from "../hooks/useError";
import Retry from "../components/Retry";

const FeedScreen = () => {
  const { colors } = useTheme();
  const { thoughts, pages, isLoading, isError, message } = useSelector(
    (state) => state.thought
  );
  useError(isError, message);

  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (isLoading && pages.feed === 0) return <LoadingSpinner size={"large"} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bc }}>
      {/* <ToastManager duration={4000} /> */}
      <Header onModal={() => setShowModal((prev) => !prev)} />
      <ThoughtModal
        showModal={showModal}
        setShowModal={setShowModal}
        userInfo={{ id: user.id, username: user.username, token: user.token }}
      />
      {!isError ? (
        <ThoughtList
          page={pages.feed}
          thoughts={thoughts}
          getThoughts={getAllThoughts}
        />
      ) : (
        <Retry />
      )}
    </View>
  );
};

export default FeedScreen;
