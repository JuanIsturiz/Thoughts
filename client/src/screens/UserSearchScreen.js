import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughtsByUsername,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import ThoughtPost from "../components/ThoughtPost";
import { ScrollView } from "react-native";
import { useEffect } from "react";

const UserSearchScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { searchThoughts } = useSelector((state) => state.thought);
  const { username } = route.params;
  console.log(username.substring(1, username.length));
  useEffect(() => {
    dispatch(getThoughtsByUsername(username.substring(1, username.length)));
    return () => {
      dispatch(resetSearchThoughts());
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={{ fontSize: 38, textTransform: "capitalize" }}>
          {username}
        </Text>
      </View>
      <ScrollView style={{ height: 700 }}>
        <View>
          {searchThoughts.length ? (
            searchThoughts.map((thought, idx) => (
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
  heading: {
    paddingVertical: 5,
    justifyContent: "center",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
  },
});
export default UserSearchScreen;
