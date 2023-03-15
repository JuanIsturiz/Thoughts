import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import * as Localization from "expo-localization";
import en from "../i18n/en.json";
import es from "../i18n/es.json";

i18next.init({
  compatibilityJSON: "v3",
  interpolation: { escapeValue: false },
  lng: Localization.locale.slice(0, 2),
  resources: {
    en: { global: en },
    es: { global: es },
  },
});

const I18Next = ({ children }) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default I18Next;
