import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "../../screens/FeedScreen";
// import SearchScreen from "../../screens/SearchScreen";
import UserScreen from "../../screens/UserScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchNavigator from "../stacks/SearchStack";
import UserNavigator from "../stacks/userStack";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="thought-bubble-outline"
              color={color}
              size={40}
            />
          ),
          tabBarLabel: "Feed",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="zoom" color={color} size={30} />
          ),
          tabBarLabel: "Search",
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={30} />
          ),
          tabBarLabel: "User",
        }}
      />
    </Tab.Navigator>
  );
}
