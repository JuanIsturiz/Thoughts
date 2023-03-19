import { useEffect, useState } from "react";
import { TouchableOpacity, Easing, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteThought } from "../redux/slices/ThoughtSlice";

const DeleteTrashcan = ({ thoughtId }) => {
  const dispatch = useDispatch();

  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
      delay: 1250,
      easing: Easing.linear,
    }).start();
  }, []);

  const onDelete = (id) => {
    dispatch(deleteThought(id));
  };

  return (
    <Animated.View style={{ opacity: animatedValue }}>
      <TouchableOpacity onPress={() => onDelete(thoughtId)}>
        <Feather name="trash" color="#FF5C5C" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DeleteTrashcan;
