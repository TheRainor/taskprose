// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translations
import en from "./locales/en/translation.json";
import tr from "./locales/tr/translation.json";
import de from "./locales/de/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";
import it from "./locales/it/translation.json";
import pt from "./locales/pt/translation.json";
import ru from "./locales/ru/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";
import ar from "./locales/ar/translation.json";
import zh from "./locales/zh/translation.json";

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
  pt: { translation: pt },
  ru: { translation: ru },
  ja: { translation: ja },
  ko: { translation: ko },
  ar: { translation: ar },
  zh: { translation: zh },
};

const supportedLngs = Object.keys(resources);
const rtlLngs = ["ar"];

// URL'den lng parametresini al
const getUrlLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lng');
  if (urlLang && supportedLngs.includes(urlLang)) {
    return urlLang;
  }
  return null;
};

// Başlangıç dilini belirle
const urlLanguage = getUrlLanguage();
const savedLang = localStorage.getItem("i18nextLng");
let initialLanguage = "tr"; // Varsayılan Türkçe

// Öncelik sırası: 1. URL, 2. localStorage, 3. Varsayılan
if (urlLanguage) {
  initialLanguage = urlLanguage;
} else if (savedLang && supportedLngs.includes(savedLang)) {
  initialLanguage = savedLang;
}

// i18n'i başlat
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs,
    fallbackLng: "en",
    lng: initialLanguage, // Yukarıda belirlediğimiz dil
    load: "languageOnly",
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      caches: [], // URL parametresini localStorage'a kaydetme
      excludeCacheFor: ["cimode"],
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

// Dil değişince HTML güncelle
i18n.on("languageChanged", (lng) => {
  const html = document.documentElement;
  html.setAttribute("lang", lng);
  html.setAttribute("dir", rtlLngs.includes(lng) ? "rtl" : "ltr");
  
  // URL parametresi varsa localStorage'a kaydetme
  const urlLang = getUrlLanguage();
  if (!urlLang) {
    localStorage.setItem("i18nextLng", lng);
  }
});

// Electron'dan dili al ve ayarla
const initLanguage = async () => {
  // URL'de ?lng= varsa, zaten ayarlandı
  const urlLang = getUrlLanguage();
  if (urlLang) {
    const html = document.documentElement;
    html.setAttribute("lang", urlLang);
    html.setAttribute("dir", rtlLngs.includes(urlLang) ? "rtl" : "ltr");
    return;
  }
  
  // localStorage varsa onu kullan
  const savedLang = localStorage.getItem("i18nextLng");
  if (savedLang && supportedLngs.includes(savedLang)) {
    const html = document.documentElement;
    html.setAttribute("lang", savedLang);
    html.setAttribute("dir", rtlLngs.includes(savedLang) ? "rtl" : "ltr");
    return;
  }
  
  // Electron'daysa OS dilini al
  if (window.localeAPI?.getLocale) {
    try {
      const locale = await window.localeAPI.getLocale();
      const lang = locale.split("-")[0].toLowerCase();
      
      if (supportedLngs.includes(lang)) {
        await i18n.changeLanguage(lang);
      } else {
        await i18n.changeLanguage("tr");
      }
    } catch (error) {
      await i18n.changeLanguage("tr");
    }
  }
  
  // HTML attribute'larını güncelle
  const currentLang = i18n.language;
  const html = document.documentElement;
  html.setAttribute("lang", currentLang);
  html.setAttribute("dir", rtlLngs.includes(currentLang) ? "rtl" : "ltr");
};

// Sayfa yüklendikten sonra çalıştır
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}

export default i18n;