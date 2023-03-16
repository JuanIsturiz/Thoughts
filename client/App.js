import { NavigationContainer } from "@react-navigation/native";
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
import LoadingSpinner from "./src/components/LoadingSpinner";
import * as Localization from "expo-localization";

/////TODO fix user thoughts scroll
/////TODO modal position (DIMENSIONS)
/////TODO like bug on new thought
/////TODO initial uef LOCALIZATION
/////TODO ADD BIO
/////TODO add user profile screen
//TODO handle errors

const AppWrapper = () => {
  const { i18n } = useTranslation("global");
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.global);
  useEffect(() => {
    dispatch(getLanguage()).then((res) => {
      if (res.payload === null) {
        i18n.changeLanguage(Localization.locale.slice(0, 2));
      } else {
        i18n.changeLanguage(res.payload);
      }
    });
    dispatch(getTheme());
    dispatch(getUser());
  }, [dispatch]);

  // if (isLoading) return <LoadingSpinner size={"large"} />;

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
