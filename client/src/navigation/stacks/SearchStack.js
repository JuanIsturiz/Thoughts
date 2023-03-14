import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../../screens/SearchScreen";
import EmotionSearchScreen from "../../screens/EmotionSearchScreen";
import UserSearchScreen from "../../screens/UserSearchScreen";

const Stack = createNativeStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Intro"
    >
      <Stack.Screen
        name="Intro"
        component={SearchScreen}
        options={{ headerTitle: "Intro" }}
      />
      <Stack.Screen
        name="Emotion"
        component={EmotionSearchScreen}
        options={{ headerTitle: "Emotion" }}
      />
      <Stack.Screen
        name="User"
        component={UserSearchScreen}
        options={{ headerTitle: "User" }}
      />
    </Stack.Navigator>
  );
}
