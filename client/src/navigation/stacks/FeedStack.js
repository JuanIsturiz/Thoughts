import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import FeedScreen from "../../screens/FeedScreen";
import UserProfileScreen from "../../screens/UserProfileScreen";

const Stack = createNativeStackNavigator();

export default function FeedNavigator() {
  const { t } = useTranslation("global");

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={FeedScreen}
        options={{ headerTitle: t("feed_stack.feed") }}
      />
      <Stack.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{ headerTitle: t("feed_stack.user_profile") }}
      />
    </Stack.Navigator>
  );
}
