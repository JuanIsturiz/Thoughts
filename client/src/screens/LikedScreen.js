import { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToastManager from "toastify-react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import Retry from "../components/Retry";
import ThoughtList from "../components/ThoughtList";
import useError from "../hooks/useError";
import {
  getLikedThoughts,
  resetLikedThoughts,
} from "../redux/slices/ThoughtSlice";
import { useTheme } from "@react-navigation/native";

const LikedScreen = ({ route }) => {
  const { userId } = route.params;
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const { likedThoughts, pages, isLoading, isError, message, errors } =
    useSelector((state) => state.thought);

  useError(
    isError ? isError : errors.liked.isError,
    message ? message : errors.liked.msg
  );

  useEffect(() => {
    return () => {
      dispatch(resetLikedThoughts());
    };
  }, [dispatch]);

  const info = {
    userId,
    page: pages.liked,
  };

  if (isLoading && pages.liked === 0) return <LoadingSpinner size={"large"} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bc }}>
      <ToastManager duration={4000} />
      {!errors.liked.isError ? (
        <ThoughtList
          page={pages.liked}
          thoughts={likedThoughts}
          getThoughts={getLikedThoughts}
          info={info}
        />
      ) : (
        <Retry />
      )}
    </View>
  );
};

export default LikedScreen;
