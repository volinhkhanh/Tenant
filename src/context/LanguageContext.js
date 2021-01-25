import React, {createContext, useState, useContext, useEffect} from 'react';
// import * as RNLocalize from 'react-native-localize';
import {LocaleConfig} from 'react-native-calendars';
import i18n from 'i18n-js';
import en from '../assets/translations/en1.json';
import vi from '../assets/translations/vi1.json';
// import {Platform, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import {generateTs} from '../assets/translations';

// const locale =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale
//     : NativeModules.I18nManager.localeIdentifier;

// i18n.defaultLocale = locale.substring(0, 2);
i18n.fallbacks = true;
i18n.translations = {en, vi};
// i18n.locale = RNLocalize.locale;

LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng giêng',
    'Tháng hai',
    'Tháng ba',
    'Tháng tư',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai',
  ],
  monthNamesShort: [
    '01.',
    '02.',
    '03.',
    '04.',
    '05.',
    '06.',
    '07.',
    '08.',
    '09.',
    '10.',
    '11.',
    '12.',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN.', 'T2.', 'T3.', 'T4.', 'T5.', 'T6.', 'T7.'],
};

LocaleConfig.locales.en = LocaleConfig.locales[''];

const {t} = i18n;

const LanguageContext = createContext();

export function LanguageProvider({children}) {
  // const [language, setLanguage] = useState(locale.substring(0, 2));
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const locale = await AsyncStorage.getItem('locale');
    i18n.locale = locale;
    LocaleConfig.defaultLocale = locale || 'en';
    setLanguage(locale || 'en');
  };

  function switchLanguage(nextLocale) {
    AsyncStorage.setItem('locale', nextLocale);
    i18n.locale = nextLocale;
    LocaleConfig.defaultLocale = nextLocale;
    setLanguage(nextLocale);
  }

  const ts = generateTs(t);

  return (
    <LanguageContext.Provider value={{t, ...ts, language, switchLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
