type TypeError = Record<string, string>;

type ValidationError = Record<string, TypeError>

const specialCharacters = 'ⓘ Поле не должно содержать спецсимволы';

export const helperTexts = {
  PASSWORD: `8-22 символа, без знаков: "< > ( ) [ ] @ ' : \\ / " *`
}

export const errorTexts:ValidationError = {
  EMAIL:{
    PATTERN: 'ⓘ Введите действительный email',
    SERVER_ERROR: 'ⓘ Аккаунта с этим email не существует',
  },
  PASSWORD: {
    PATTERN: helperTexts.PASSWORD,
    SERVER_ERROR: 'ⓘ Неправильный пароль',
    CONFIRM: 'ⓘ Пароли не совпадают'
  },
  FIRST_NAME: {
    PATTERN: specialCharacters,
  },
  LAST_NAME: {
    PATTERN: specialCharacters,
  },
  EMPTY_FIELD: {
    PATTERN: 'ⓘ Поле обязательно для заполнения',
  },
  PHONE_NUMBER: {
    PATTERN: 'ⓘ Введите действительный номер телефона'
  },
  JOB_TITLE: {
    PATTERN: specialCharacters
  }
}
