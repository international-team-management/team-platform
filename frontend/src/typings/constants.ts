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
  // SECOND_NAME = 'second_name',
  LAST_NAME = 'last_name',
  JOB_TITLE = 'job_title',
  TIMEZONE = 'user_timezone',
}
