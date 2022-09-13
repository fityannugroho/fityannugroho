const translation = (locale) => {
  let translation = {};

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
     * @param {string} key The key of translation.
     * @return {string} The translation.
     */
    get(key) {
      return translation[key];
    },
  };
};

export default translation;
