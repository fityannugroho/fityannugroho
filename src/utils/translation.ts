type Translation = Record<string, string>;

const translation = (locale?: string) => {
  let translation: Translation = {};

  try {
    translation = require(`../locales/${locale}`).default;
  } catch (error) {
    throw new Error(`Locale '${locale}' is not exist in locales folder`);
  }

  if (typeof translation !== 'object') {
    throw new Error(`Locale '${locale}' is not valid object`);
  }

  return {
    /**
     * Get translation by key.
     * @param key The key of translation.
     * @return The translation.
     */
    get(key: string): string {
      return translation[key];
    },
  };
};

export default translation;
