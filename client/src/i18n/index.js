import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./en.json";
import es from "./es.json";

const resources = {
  en,
  es,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: Localization.locale.slice(0, 2),
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
