// src/libs/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// ---- JSON dosyaları ----
import en from "../locales/en/translation.json";
import tr from "../locales/tr/translation.json";
import ar from "../locales/ar/translation.json";
import de from "../locales/de/translation.json";
import es from "../locales/es/translation.json";
import fr from "../locales/fr/translation.json";
import it from "../locales/it/translation.json";
import ja from "../locales/ja/translation.json";
import ko from "../locales/ko/translation.json";
import pt from "../locales/pt/translation.json";
import ru from "../locales/ru/translation.json";
import zh from "../locales/zh/translation.json";

// ---- Expo Dil Algılayıcı ----
const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    try {
      const lang = Localization.locale.split("-")[0]; // ör: "en-US" → "en"
      callback(lang);
    } catch (e) {
      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

// ---- i18next Başlat ----
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      ar: { translation: ar },
      de: { translation: de },
      es: { translation: es },
      fr: { translation: fr },
      it: { translation: it },
      ja: { translation: ja },
      ko: { translation: ko },
      pt: { translation: pt },
      ru: { translation: ru },
      zh: { translation: zh },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
