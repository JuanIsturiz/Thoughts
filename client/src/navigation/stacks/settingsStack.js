import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, TouchableOpacity } from "react-native";
import SettingsScreen from "../../screens/SettingsScreen";
import { Entypo } from "@expo/vector-icons";
import ShareProfile from "../../screens/ShareProfile";
import AccountScreen from "../../screens/AccountScreen";

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
          headerLeft: () => <BackButton to={"Profile"} />,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: "Account",
          headerLeft: () => <BackButton to={"Settings"} />,
        }}
      />
      <Stack.Screen
        name="Share Profile"
        component={ShareProfile}
        options={{
          headerTitle: "Share Profile",
          headerLeft: () => <BackButton to={"Settings"} />,
        }}
      />
    </Stack.Navigator>
  );
}

const BackButton = ({ to }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate(to)} title="Back" color="#fff">
      <Entypo name="chevron-left" size={32} color="#222" />
    </TouchableOpacity>
  );
};
