import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import Cookies from 'universal-cookie'

const cookiesLanguage = new Cookies();
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: cookiesLanguage.get('language') || 'vi',
    backend: {
      loadPath: '/assets/lang/{{ns}}/{{lng}}.json'
    },
    fallbackLng: cookiesLanguage.get('language') || 'vi',
    //debug: true,
    ns: ['global', 'login', 'users', 'dashboard', 'movies'],
    defaultNS: 'global',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  })

export default i18n