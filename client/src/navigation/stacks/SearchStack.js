import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../../screens/SearchScreen";
import EmotionSearchScreen from "../../screens/EmotionSearchScreen";
import UserSearchScreen from "../../screens/UserSearchScreen";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function SearchNavigator() {
  const { t } = useTranslation("global");

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Intro"
    >
      <Stack.Screen
        name="Intro"
        component={SearchScreen}
        options={{ headerTitle: t("search_stack.intro") }}
      />
      <Stack.Screen
        name="Emotion"
        component={EmotionSearchScreen}
        options={{ headerTitle: t("search_stack.emotion") }}
      />
      <Stack.Screen
        name="User"
        component={UserSearchScreen}
        options={{ headerTitle: t("search_stack.user") }}
      />
    </Stack.Navigator>
  );
}
