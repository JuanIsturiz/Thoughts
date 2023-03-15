import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughtsByUsername,
  resetSearchThoughts,
} from "../redux/slices/ThoughtSlice";
import ThoughtPost from "../components/ThoughtPost";
import { ScrollView } from "react-native";
import { useEffect } from "react";
import { useTheme } from "@react-navigation/native";

const UserSearchScreen = ({ route }) => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const { searchThoughts } = useSelector((state) => state.thought);
  const { username } = route.params;
  useEffect(() => {
    dispatch(getThoughtsByUsername(username.substring(1, username.length)));
    return () => {
      dispatch(resetSearchThoughts());
    };
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <View style={styles.heading}>
        <Text
          style={{
            color: colors.font,
            fontSize: 38,
            textTransform: "capitalize",
          }}
        >
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  heading: {
    paddingVertical: 5,
    justifyContent: "center",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
  },
});
export default UserSearchScreen;
