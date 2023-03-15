import { useNavigation, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, TouchableOpacity } from "react-native";
import SettingsScreen from "../../screens/SettingsScreen";
import { Entypo } from "@expo/vector-icons";
import ShareProfile from "../../screens/ShareProfile";
import AccountScreen from "../../screens/AccountScreen";
import LanguageScreen from "../../screens/LanguageScreen";
import { useTranslation } from "react-i18next";
import ThemeScreen from "../../screens/ThemeScreen";

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTitleStyle: { color: colors.font },
        headerStyle: { backgroundColor: colors.bc },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: t("settings_stack.settings"),
          headerLeft: () => <BackButton to={"Profile"} />,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: t("settings_stack.account"),
          headerLeft: () => <BackButton to={"Settings"} />,
        }}
      />
      <Stack.Screen
        name="Share Profile"
        component={ShareProfile}
        options={{
          headerTitle: t("settings_stack.share_profile"),
          headerLeft: () => <BackButton to={"Settings"} />,
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          headerTitle: t("settings_stack.language"),
          headerLeft: () => <BackButton to={"Settings"} />,
        }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{
          headerTitle: t("settings_stack.theme"),
          headerLeft: () => <BackButton to={"Settings"} />,
        }}
      />
    </Stack.Navigator>
  );
}

const BackButton = ({ to }) => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate(to)} title="Back" color="#fff">
      <Entypo name="chevron-left" size={32} color={colors.font} />
    </TouchableOpacity>
  );
};
