import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../../screens/UserScreen";
import SettingsNavigator from "./settingsStack";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={UserScreen} />
      <Stack.Screen name="Configuration" component={SettingsNavigator} />
    </Stack.Navigator>
  );
}
