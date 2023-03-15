import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../../screens/UserScreen";
import SettingsNavigator from "./SettingsStack";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  const { t } = useTranslation("global");
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen
        name="Profile"
        component={UserScreen}
        options={{ headerTitle: t("user_stack.profile") }}
      />
      <Stack.Screen
        name="Configuration"
        component={SettingsNavigator}
        options={{ headerTitle: t("user_stack.configuration") }}
      />
    </Stack.Navigator>
  );
}
