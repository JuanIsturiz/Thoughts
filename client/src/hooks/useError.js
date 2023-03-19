import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import { resetAuth } from "../redux/slices/AuthSlice";

export default useError = (error, message) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Toast.error(message);
    }
    dispatch(resetAuth());
  }, [error, dispatch]);
};
