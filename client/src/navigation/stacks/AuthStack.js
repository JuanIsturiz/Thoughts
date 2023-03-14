import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../screens/SignUpScreen";
import SignInScreen from "../../screens/SignInScreen";
import MainScreen from "../../screens/MainScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerTitle: "Main" }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ headerTitle: "Sign Up" }}
      />
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerTitle: "Sign In" }}
      />
    </Stack.Navigator>
  );
}
