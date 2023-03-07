import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "../../screens/FeedScreen";
import SearchScreen from "../../screens/SearchScreen";
import UserScreen from "../../screens/UserScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator>
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
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="zoom" color={color} size={30} />
          ),
          tabBarLabel: "Search",
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
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
