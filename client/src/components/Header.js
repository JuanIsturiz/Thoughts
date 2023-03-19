import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EntyPo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";

const Header = ({ onModal }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.lightBorder }]}>
      <Text style={[styles.title, { color: colors.font }]}>Thoughts</Text>
      <TouchableOpacity onPress={onModal}>
        <EntyPo name="squared-plus" size={60} color={colors.lightblue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 36,
  },
});
export default Header;
