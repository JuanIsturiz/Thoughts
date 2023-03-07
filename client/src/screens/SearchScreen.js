import { StyleSheet, Text, View } from "react-native";
import Searchbar from "../components/Searchbar";

const emotions = [
  "contempt",
  "fear",
  "anger",
  "shame",
  "surprise",
  "disgust",
  "joy",
  "distress",
  "interest",
  "guilt",
];

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Searchbar />
      <View style={styles.wrapper}>
        {emotions.map((e) => (
          <View key={e} style={styles.emotion}>
            <Text style={styles.text}>#{e}</Text>
          </View>
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
