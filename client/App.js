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
import I18Next from "./src/providers/I18Next";
import { getLanguage, getTheme } from "./src/redux/slices/GlobalSlice";
import { useTranslation } from "react-i18next";

const AppWrapper = () => {
  const { i18n } = useTranslation("global");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.global);
  useEffect(() => {
    dispatch(getLanguage()).then((res) => {
      if (res === null) {
        i18n.changeLanguage("en");
      } else {
        i18n.changeLanguage(res.payload);
      }
    });
    dispatch(getTheme());
    dispatch(getUser());
  }, [dispatch]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.mode === "light" ? "#BCCEF8" : "#78839C",
        paddingTop: 50,
      }}
    >
      <NavigationContainer theme={theme}>
        {!user ? <AuthNavigator /> : <HomeNavigator />}
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <I18Next>
        <AppWrapper />
      </I18Next>
    </Provider>
  );
}
