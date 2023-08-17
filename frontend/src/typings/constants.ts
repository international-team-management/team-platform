export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  SELECT = 'select',
  FILE = 'file',
}

export enum InputName {
  TEXT = InputType.TEXT,
  PASSWORD = InputType.PASSWORD,
  CURRENT_PASSWORD = 'current_password',
  CONFIRM_PASSWORD = 'confirm_password',
  NEW_PASSWORD = 'new_password',
  EMAIL = InputType.EMAIL,
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  ROLE = 'role',
  TIMEZONE = 'timezone',
  WORK_START = 'work_start',
  WORK_FINISH = 'work_finish',
  TELEPHONE = 'telephone_number',
  PHOTO = 'photo',
  PROJECT_TITLE = 'project_title',
  PROJECT_PRIORITY = 'project_priority',
  PROJECT_STATUS = 'project_status',
  PROJECT_DESCRIPTION = 'project_description',
}
