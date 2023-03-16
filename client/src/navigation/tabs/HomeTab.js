import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "../../screens/FeedScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchNavigator from "../stacks/SearchStack";
import UserNavigator from "../stacks/UserStack";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import FeedNavigator from "../stacks/FeedStack";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  const { colors } = useTheme();
  const { t } = useTranslation("global");
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bc },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontSize: 12, fontWeight: 700 },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="thought-bubble-outline"
              color={color}
              size={40}
            />
          ),
          tabBarActiveTintColor: colors.lightblue,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarLabel: t("home_tab.feed"),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="zoom" color={color} size={28} />
          ),
          tabBarActiveTintColor: colors.lightblue,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarLabel: t("home_tab.search"),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={28} />
          ),
          tabBarActiveTintColor: colors.lightblue,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarLabel: t("home_tab.user"),
        }}
      />
    </Tab.Navigator>
  );
}
