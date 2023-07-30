import React from 'react';
import { InputPhoneTemplate } from '../UI/phone-input-template/InputPhoneTemplate';
import { ProfileSectionTitle } from 'src/components/profile-section-title/ProfileSectionTitle';
// import { ProfileMenu } from 'src/components/profile-menu/ProfileMenu';
import { errorTexts, helperTexts } from 'src/utils/validation/helperTexts';
import InputTimezoneSelect from '../UI/timezone-input-template/InputTimezoneSelect';
import { Input } from '../UI/input-template/InputTemplate';
import { InputType, InputName } from 'src/typings/constants';
import styles from './ProfileForm.module.scss';
import userAvatar from 'src/assets/framed-avatar.svg';
import { useForm } from 'react-hook-form';
import { patterns } from 'src/utils/validation/patterns';
import { DevTool } from '@hookform/devtools';
import {
  RegisterRequestData,
  ProfileRequestData,
  UpdatePasswordData,
} from 'src/services/api/types';

export function ProfileForm(): React.ReactNode {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileRequestData>({ mode: 'onChange', criteriaMode: 'all' });

  const updatePasswordForm = useForm<UpdatePasswordData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const handlerFormSubmit = (data: RegisterRequestData) => {
    console.log(data);
  };

  const handlerInputSubmit = (e) => {
    if (!(e.target.name in errors)) {
      e.target.value = e.target.value.trim();
      console.log(e.target.value);
    }
  };

  const handlerInputZoneSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Фото профиля"
          description="По&nbsp;реальной фотографии коллеги смогут легко узнать вас."
        />
        <form className={styles.profile__form_photo}>
          <img className={styles.profile__img} alt="Фото" src={userAvatar} />
          <div className={styles.profile__buttons}>
            <button className={styles.profile__button_blue}>
              Загрузить фотографию
            </button>
          </div>
        </form>
      </section>

      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Личные данные"
          description="Эта информация будет доступна всем участникам проекта."
        />
        <form className={styles.profile__form_data}>
          <Input
            type={InputType.TEXT}
            name={InputName.FIRST_NAME}
            label="Имя"
            placeholder="Иван"
            register={register}
            errorObject={errors[InputName.FIRST_NAME]}
            validOptions={{
              minLength: {
                value: 1,
                message: errorTexts.FIRST_NAME.LENGTH,
              },
              maxLength: {
                value: 30,
                message: errorTexts.FIRST_NAME.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.NAME,
                message: errorTexts.FIRST_NAME.PATTERN,
              },
            }}
            onBlur={(e) => handlerInputSubmit(e)}
          />
          <Input
            type={InputType.TEXT}
            name={InputName.LAST_NAME}
            label="Фамилия"
            placeholder="Иванов"
            register={register}
            errorObject={errors[InputName.LAST_NAME]}
            validOptions={{
              minLength: {
                value: 1,
                message: errorTexts.LAST_NAME.LENGTH,
              },
              maxLength: {
                value: 30,
                message: errorTexts.LAST_NAME.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.NAME,
                message: errorTexts.LAST_NAME.PATTERN,
              },
            }}
            onBlur={(e) => handlerInputSubmit(e)}
          />
          <Input
            type={InputType.TEXT}
            name={InputName.JOB_TITLE}
            label="Должность"
            placeholder=""
            register={register}
            errorObject={errors[InputName.JOB_TITLE]}
            validOptions={{
              minLength: {
                value: 1,
                message: errorTexts.JOB_TITLE.LENGTH,
              },
              maxLength: {
                value: 30,
                message: errorTexts.JOB_TITLE.LENGTH,
              },
              pattern: {
                value: patterns.JOB_TITLE,
                message: errorTexts.JOB_TITLE.PATTERN,
              },
            }}
            onBlur={(e) => handlerInputSubmit(e)}
          />
          <Input
            type={InputType.EMAIL}
            name={InputName.EMAIL}
            label="Email"
            placeholder="example@site.mail"
            register={register}
            errorObject={errors[InputName.EMAIL]}
            validOptions={{
              minLength: {
                value: 5,
                message: errorTexts.EMAIL.LENGTH,
              },
              maxLength: {
                value: 80,
                message: errorTexts.EMAIL.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.EMAIL,
                message: errorTexts.EMAIL.PATTERN,
              },
            }}
            onBlur={(e) => handlerInputSubmit(e)}
          />
          <InputPhoneTemplate onBlur={(e) => handlerInputSubmit(e)} />
        </form>
      </section>

      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Доступность"
          description="Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды."
        />
        <form className={styles.profile__form}>
          <InputTimezoneSelect
            onChange={handlerInputZoneSubmit}
            label="Часовой пояс"
          />
        </form>
      </section>

      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Смена пароля"
          description="На ваш email сразу придет ссылка для смены пароля."
        />

        <form
          onSubmit={updatePasswordForm.handleSubmit(handlerFormSubmit)}
          className={styles.profile__form}
        >
          <Input
            type={InputType.PASSWORD}
            name={InputName.PASSWORD}
            label="Текущий пароль"
            register={updatePasswordForm.register}
            isPassword={true}
            placeholder=""
            useTogglePassword={true}
            errorObject={
              updatePasswordForm.formState.errors[InputName.PASSWORD]
            }
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              minLength: {
                value: 8,
                message: errorTexts.PASSWORD.LENGTH,
              },
              maxLength: {
                value: 22,
                message: errorTexts.PASSWORD.LENGTH,
              },
              pattern: {
                value: patterns.PASSWORD,
                message: errorTexts.PASSWORD.PATTERN,
              },
            }}
          />
          <Input
            type={InputType.PASSWORD}
            name={InputName.NEW_PASSWORD}
            label="Новый пароль"
            helperText={[
              helperTexts.PASSWORD_LENGTH,
              helperTexts.PASSWORD_SYMBOLS,
            ]}
            register={updatePasswordForm.register}
            isPassword={true}
            placeholder=""
            useTogglePassword={true}
            errorObject={
              updatePasswordForm.formState.errors[InputName.NEW_PASSWORD]
            }
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              minLength: {
                value: 8,
                message: errorTexts.PASSWORD.LENGTH,
              },
              maxLength: {
                value: 22,
                message: errorTexts.PASSWORD.LENGTH,
              },
              pattern: {
                value: patterns.PASSWORD,
                message: errorTexts.PASSWORD.PATTERN,
              },
            }}
          />
          <Input
            type={InputType.PASSWORD}
            name={InputName.CONFIRM_PASSWORD}
            label="Повторите новый пароль"
            register={updatePasswordForm.register}
            isPassword={true}
            placeholder=""
            useTogglePassword={true}
            errorObject={
              updatePasswordForm.formState.errors[InputName.CONFIRM_PASSWORD]
            }
            getValues={getValues}
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              validate: (value: string, formValues: ProfileRequestData) =>
                value !== formValues.new_password
                  ? errorTexts.PASSWORD.CONFIRM
                  : true,
            }}
          />
          <button className={styles['profile__button_light-blue']}>
            Сменить пароль
          </button>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
}
