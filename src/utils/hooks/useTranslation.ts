import { useRouter } from 'next/router';
import { useMemo } from 'react';
import localeEN from '@/locales/en';
import localeID from '@/locales/id';
import { Locale } from '@/types/Locale';

const useTranslation = () => {
  const { defaultLocale, locale, locales } = useRouter();
  const translation = useMemo<Locale>(() => {
    switch (locale) {
      case 'id':
        return localeID;
      default:
        return localeEN;
    }
  }, [locale]);

  return {
    /**
     * Get default locale.
     */
    defaultLocale,
    /**
     * Get current locale.
     */
    locale,
    /**
     * Get available locales.
     */
    locales,
    /**
     * Get translation by key.
     * @param key The key of translation.
     * @return The translation.
     */
    translate: (key: keyof Locale) => translation[key],
  };
};

export default useTranslation;
