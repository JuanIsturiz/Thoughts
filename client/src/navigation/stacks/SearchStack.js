import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../../screens/SearchScreen";
import EmotionScreen from "../../screens/EmotionScreen";

const Stack = createNativeStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Intro"
    >
      <Stack.Screen name="Intro" component={SearchScreen} />
      <Stack.Screen name="Emotion" component={EmotionScreen} />
    </Stack.Navigator>
  );
}
