import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import commonEn from './locales/en/common.json';
import translationEn from './locales/en/translation.json';
import validationEn from './locales/en/validation.json';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    nsSeparator: '.',
    debug: false,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        common: commonEn,
        translation: translationEn,
        validation: validationEn
      }
    },
    ns: ['common', 'translation', 'validation'],
    defaultNS: 'translation'
  });

export default i18n;
