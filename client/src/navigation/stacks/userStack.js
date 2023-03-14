import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../../screens/UserScreen";
import SettingsNavigator from "./SettingsStack";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen
        name="Profile"
        component={UserScreen}
        options={{ headerTitle: "Profile" }}
      />
      <Stack.Screen
        name="Configuration"
        component={SettingsNavigator}
        options={{ headerTitle: "Configuration" }}
      />
    </Stack.Navigator>
  );
}
