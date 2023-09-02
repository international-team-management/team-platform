type TypeError = Record<string, string>;

type ValidationError = Record<string, TypeError>;

const specialCharacters = 'ⓘ Поле не должно содержать спецсимволы';

export const helperTexts = {
  PASSWORD_LENGTH: `8-22 символа`,
  PASSWORD_SYMBOLS: `без знаков: "< > ( ) [ ] @ ' : \\ / *`,
  NAME: `1-30 символов`,
  EMAIL: `5-80 символов`,
  ROLE: `1-30 символов`,
};

export const errorTexts: ValidationError = {
  EMAIL: {
    PATTERN: 'ⓘ Введите действительный email',
    LENGTH: `ⓘ ${helperTexts.EMAIL}`,
    SERVER_ERROR: 'ⓘ Аккаунта с этим email не существует',
  },
  PASSWORD: {
    LENGTH: helperTexts.PASSWORD_LENGTH,
    PATTERN: helperTexts.PASSWORD_SYMBOLS,
    SERVER_ERROR: 'ⓘ Неправильный пароль',
    CONFIRM: 'ⓘ Пароли не совпадают',
  },
  FIRST_NAME: {
    PATTERN: specialCharacters,
    LENGTH: helperTexts.NAME,
  },
  LAST_NAME: {
    PATTERN: specialCharacters,
    LENGTH: helperTexts.NAME,
  },
  EMPTY_FIELD: {
    PATTERN: 'ⓘ Поле обязательно для заполнения',
  },
  PHONE_NUMBER: {
    PATTERN: 'ⓘ Введите действительный номер телефона',
  },
  ROLE: {
    PATTERN: specialCharacters,
    LENGTH: helperTexts.ROLE,
  },
};
