export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  SELECT = 'select',
}

export enum InputName {
  TEXT = InputType.TEXT,
  PASSWORD = InputType.PASSWORD,
  CONFIRM_PASSWORD = 'confirm_password',
  NEW_PASSWORD = 'new_password',
  EMAIL = InputType.EMAIL,
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  ROLE = 'role',
  TIMEZONE = 'user_timezone',
  TELEPHONE = 'telephone_number',
}
