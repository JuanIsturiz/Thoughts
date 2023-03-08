import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../components/Header";
import ThoughtModal from "../components/ThoughtModal";
import ThoughtPost from "../components/ThoughtPost";

const FeedScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Header onModal={() => setShowModal((prev) => !prev)} />
      <ThoughtModal showModal={showModal} setShowModal={setShowModal} />
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
