import { ScrollView } from "react-native";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import ThoughtPost from "../components/ThoughtPost";
import { deleteThought, getThoughtsByUser } from "../redux/slices/ThoughtSlice";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
//TODO fix user thoughts scroll, modal position (DIMENSIONS) and like bug on new thought, ADD BIO
const UserScreen = () => {
  const { navigate } = useNavigation();
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
          <TouchableOpacity onPress={() => navigate("Configuration")}>
            <Feather name="settings" size={30} />
          </TouchableOpacity>
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
                  gap: 10,
                }}
              >
                <ThoughtPost thought={thought} userPage={true} />
                <TouchableOpacity onPress={() => onDelete(thought._id)}>
                  <Feather name="trash" color="#FF5C5C" size={30} />
                </TouchableOpacity>
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
