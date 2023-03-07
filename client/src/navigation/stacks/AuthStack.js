import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../screens/SignUpScreen";
import SignInScreen from "../../screens/SignInScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
    </Stack.Navigator>
  );
}
