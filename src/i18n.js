import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import itTranslation from './locales/it/translation.json';
import enTranslation from './locales/en/translation.json';

const resources = {
  en: { translation: enTranslation },
  it: { translation: itTranslation }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "it",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
