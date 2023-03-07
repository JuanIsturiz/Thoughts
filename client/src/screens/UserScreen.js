import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ThoughtPost from "../components/ThoughtPost";

const UserScreen = () => {
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
          <Text style={{ fontSize: 32 }}>Sample Username</Text>
          <Pressable onPress={() => console.log(123)}>
            <Feather name="settings" size={30} />
          </Pressable>
        </View>
        <View style={styles.description}>
          <Text style={{ fontSize: 18 }}>Sample user bio...</Text>
        </View>
      </View>

      <View style={styles.container}>
        <ThoughtPost />
        <ThoughtPost />
        <ThoughtPost />
        <ThoughtPost />
      </View>
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
