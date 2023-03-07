import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import AuthNavigator from "./src/navigation/stacks/AuthStack";
import HomeNavigator from "./src/navigation/tabs/HomeTab";

export default function App() {
  // const { user } = useSelector((state) => state.auth);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
        {/* {!user ? <AuthNavigator /> : <HomeNavigator />} */}
      </NavigationContainer>
    </Provider>
  );
}
