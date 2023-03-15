import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ThoughtModal from "../components/ThoughtModal";
import ThoughtPost from "../components/ThoughtPost";
import { getAllThoughts } from "../redux/slices/ThoughtSlice";

const FeedScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { thoughts } = useSelector((state) => state.thought);
  useEffect(() => {
    dispatch(getAllThoughts());
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <View style={{ backgroundColor: colors.bc }}>
      <Header onModal={() => setShowModal((prev) => !prev)} />
      <ThoughtModal
        showModal={showModal}
        setShowModal={setShowModal}
        userInfo={{ id: user.id, username: user.username, token: user.token }}
      />
      <ScrollView style={{ height: 700 }}>
        <View style={styles.container}>
          {thoughts.length ? (
            thoughts.map((thought, idx) => (
              <ThoughtPost key={idx} thought={thought} />
            ))
          ) : (
            <Text>No thoughts to show :(</Text>
          )}
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
