import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const copy = {
  en: "© 2023 Juan Isturiz. All Rights Reserved",
  es: "© 2023 Juan Isturiz. Todos Los Derechos Reservados",
};

const CopyrightScreen = () => {
  const { colors } = useTheme();
  const language = useSelector((state) => state.global.language);
  return (
    <View style={[styles.container, { backgroundColor: colors.bc }]}>
      <Text style={{ color: colors.font, fontSize: 20, fontWeight: 500 }}>
        {copy[language]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CopyrightScreen;
