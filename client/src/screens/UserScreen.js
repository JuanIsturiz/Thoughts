import { ScrollView } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton";
import ThoughtPost from "../components/ThoughtPost";
import { deleteThought, getThoughtsByUser } from "../redux/slices/ThoughtSlice";
import { useEffect } from "react";

const UserScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userThoughts } = useSelector((state) => state.thought);
  useEffect(() => {
    dispatch(getThoughtsByUser(user.id));
  }, [dispatch]);

  const onDelete = (id) => {
    dispatch(deleteThought(id));
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.header_title}>Profile</Text>
      </View>
      <LogoutButton />
      <View style={styles.user_info}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 32 }}>
            {user ? user.username : "Sample User"}
          </Text>
          <Pressable onPress={() => console.log(123)}>
            <Feather name="settings" size={30} />
          </Pressable>
        </View>
        <View style={styles.description}>
          <Text style={{ fontSize: 18 }}>Sample user bio...</Text>
        </View>
      </View>
      <ScrollView style={{ height: 700 }}>
        <View style={styles.container}>
          {userThoughts.length ? (
            userThoughts.map((thought, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ThoughtPost thought={thought} userPage={true} />
                <Pressable onPress={() => onDelete(thought._id)}>
                  <Feather name="trash" color="red" size={30} />
                </Pressable>
              </View>
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
  header: {
    height: 72,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  header_title: {
    fontSize: 36,
  },
  user_info: {
    marginVertical: 15,
    marginHorizontal: 20,
    marginTop: 50,
    alignItems: "center",
  },
  description: {
    width: 325,
    padding: 7,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
  },
});

export default UserScreen;
