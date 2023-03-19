import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../screens/SignUpScreen";
import SignInScreen from "../../screens/SignInScreen";
import MainScreen from "../../screens/MainScreen";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const { t } = useTranslation("global");

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerTitle: t("auth_stack.main") }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ headerTitle: t("auth_stack.sign_up") }}
      />
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerTitle: t("auth_stack.sign_in") }}
      />
    </Stack.Navigator>
  );
}
