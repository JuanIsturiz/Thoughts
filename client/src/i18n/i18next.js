import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./en.json";
import es from "./es.json";

const resources = {
  en: { global: en },
  es: { global: es },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
  lng: Localization.locale.slice(0, 2),
  fallbackLng: "en",
  resources,
  keySeparator: false,
});

export default i18next;
