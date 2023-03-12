import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import LogoutModal from "../components/LogoutModal";

const SettingsScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.section}>
        <Text style={styles.section_title}>Account</Text>
        <View>
          <View style={styles.option}>
            <Text style={styles.option_title}>Account</Text>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={32} color="#222" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.option_title}>Share Profile</Text>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={32} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section_title}>Display</Text>
        <View>
          <View style={styles.option}>
            <Text style={styles.option_title}>Language</Text>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={32} color="#222" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.option_title}>Theme</Text>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={32} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section_title}>Log In</Text>
        <View>
          <TouchableOpacity
            style={styles.option}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.option_title}>Sign Out</Text>
            <Entypo name="chevron-right" size={32} color="#222" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  option: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#BCCEF8",
    borderRadius: 5,
  },
  section_title: { fontSize: 26, fontWeight: 500, marginBottom: 5 },
  option_title: { fontSize: 18, fontWeight: 500 },
});

export default SettingsScreen;
