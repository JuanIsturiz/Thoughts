import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import AuthNavigator from "./src/navigation/stacks/AuthStack";
import HomeNavigator from "./src/navigation/tabs/HomeTab";
import { getUser } from "./src/redux/slices/AuthSlice";
import { useEffect } from "react";
import { View } from "react-native";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <View style={{ flex: 1, backgroundColor: "#BCCEF8", paddingTop: 50 }}>
      <NavigationContainer>
        {!user ? <AuthNavigator /> : <HomeNavigator />}
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
