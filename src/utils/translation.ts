import localeEN from '@/locales/en';
import localeID from '@/locales/id';

type Translation = Record<string, string>;

const translation = (locale?: string) => ({
  /**
   * Get translation by key.
   * @param key The key of translation.
   * @return The translation.
   */
  get(key: string): string {
    const trans: Translation = locale === 'id' ? localeID : localeEN;
    return trans[key];
  },
});

export default translation;
