import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import ThoughtPost from "../components/ThoughtPost";

const FeedScreen = () => {
  return (
    <View>
      <Header />
      <ScrollView style={{ height: 700 }}>
        <View style={styles.container}>
          <ThoughtPost />
          <ThoughtPost />
          <ThoughtPost />
          <ThoughtPost />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

export default FeedScreen;
