/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ref } from 'vue'
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import tr from './locales/tr.json'
import es from './locales/es.json'
import de from './locales/de.json'
import fr from './locales/fr.json'

const defaultLocale = ref(navigator?.languages[1]?.substring(0, 2))

const numberFormats = {
  mt: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      useGrouping: true,
      currencyDisplay: 'symbol',
    },
    currencyNoCents: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2, // set fraction digits to 0 to remove cents
      maximumFractionDigits: 2,
      currencyDisplay: 'symbol',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
      useGrouping: true,
      currencyDisplay: 'symbol',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
  tr: {
    currency: {
      style: 'currency',
      currency: 'TRY',
      useGrouping: true,
      currencyDisplay: 'symbol',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
}

const i18n = createI18n({
  locale: defaultLocale.value,
  messages: {
    en,
    tr,
    es,
    de,
    fr
  },
  numberFormats,
})

export default i18n
