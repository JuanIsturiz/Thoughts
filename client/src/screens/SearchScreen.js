import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../components/Searchbar";
import { setSearchParam } from "../redux/slices/ThoughtSlice";
import emotions from "../utils/emotions";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { searchParam } = useSelector((state) => state.thought);

  const onEmotion = (emotion) => {
    if (searchParam.includes(emotion)) return;
    dispatch(setSearchParam({ text: `#${emotion}`, touchable: true }));
  };
  return (
    <View style={styles.container}>
      <Searchbar />
      <View style={styles.wrapper}>
        {emotions.map((e) => (
          <TouchableOpacity
            key={e.value}
            style={[
              styles.emotion,
              { opacity: searchParam.includes(`#${e.value}`) ? 0.5 : 1 },
            ]}
            onPress={() => onEmotion(e.value)}
          >
            <Text style={styles.text}>#{e.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BCCEF8",
  },

  wrapper: {
    marginLeft: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 15,
  },
  emotion: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#adb9ff",
    borderRadius: 5,
  },
  text: {
    fontSize: 32,
    color: "#333",
  },
});
export default SearchScreen;
