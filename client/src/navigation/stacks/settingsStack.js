import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, TouchableOpacity } from "react-native";
import SettingsScreen from "../../screens/SettingsScreen";
import { Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  const { navigate } = useNavigation();

  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("Profile")}
              title="Back"
              color="#fff"
            >
              <Entypo name="chevron-left" size={32} color="#222" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
