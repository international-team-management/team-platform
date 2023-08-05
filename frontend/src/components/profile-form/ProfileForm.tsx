import React, { FocusEvent } from 'react';
import { InputPhoneTemplate } from '../UI/phone-input-template/InputPhoneTemplate';
import { ProfileSectionTitle } from 'src/components/profile-section-title/ProfileSectionTitle';
// import { ProfileMenu } from 'src/components/profile-menu/ProfileMenu';
import { errorTexts, helperTexts } from 'src/utils/validation/helperTexts';
import { InputTimezoneSelect } from '../UI/timezone-input-template/InputTimezoneSelect';
import {
  InputTimeSelect,
  WorkTimeType,
} from '../UI/time-input-template/InputTimeSelect';
import { Input } from '../UI/input-template/InputTemplate';
import { InputType, InputName } from 'src/typings/constants';
import styles from './ProfileForm.module.scss';
import { ReactComponent as FramedAvatar } from 'assets/framed-avatar.svg';
import { useForm } from 'react-hook-form';
import { patterns } from 'src/utils/validation/patterns';
import { DevTool } from '@hookform/devtools';
import {
  // RegisterRequestData,
  ProfileRequestData,
  UpdatePasswordData,
} from 'src/services/api/types';
import { SingleValue } from 'react-select';
import { ITimezoneOption } from 'react-timezone-select';
import { useDispatch, useSelector } from 'src/services/hooks';
import { authThunks, selectUserMe } from 'src/services/slices/authSlice';

export const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const userMe = useSelector(selectUserMe);

  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm<ProfileRequestData>({ mode: 'onChange', criteriaMode: 'all' });

  const handlerInputSubmit = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!(name in errors)) {
      const value_trimmed = value.trim();
      // TODO: pass if value hasnt changed

      dispatch(authThunks.patchMe({ [name]: value_trimmed }));
    }
  };

  const handleInputPhoneSubmit = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // TODO:
    // - pass if value hasnt changed
    // - on backend change SmallIntegerField to CharField

    dispatch(
      authThunks.patchMe({ [name]: value.replace(/\D/g, '').toString() }),
    );
  };

  const updatePasswordForm = useForm<UpdatePasswordData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const handlerFormPasswordSubmit = (data: UpdatePasswordData) => {
    delete data.confirm_password;
    dispatch(authThunks.setPassword(data));
  };

  const handlerInputZoneSubmit = (
    data: SingleValue<ITimezoneOption>,
    name?: string,
  ) => {
    if (!name) return;
    console.log({ [name]: data });
    dispatch(authThunks.patchMe({ [name]: data }));
  };

  const handlerInputWorkTimeSubmit = (data: WorkTimeType) => {
    // TODO: Date or number? waiting for backend decision
    console.log(data);
    dispatch(authThunks.patchMe(data));
  };

  return (
    <>
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Фото профиля"
          description="По&nbsp;реальной фотографии коллеги смогут легко узнать вас."
        />
        <form className={styles.profile__form_photo}>
          {userMe?.photo ? (
            <img
              className={styles.profile__img}
              src={userMe.photo}
              alt={`${userMe.first_name} ${userMe.last_name}`}
            />
          ) : (
            <FramedAvatar className={styles.profile__img} />
          )}

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
          description="Эта информация будет доступна всем участникам проекта."
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
            onBlur={handlerInputSubmit}
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
            onBlur={handlerInputSubmit}
          />
          <Input
            type={InputType.TEXT}
            name={InputName.ROLE}
            label="Должность"
            placeholder=""
            register={register}
            errorObject={errors[InputName.ROLE]}
            validOptions={{
              minLength: {
                value: 1,
                message: errorTexts.ROLE.LENGTH,
              },
              maxLength: {
                value: 30,
                message: errorTexts.ROLE.LENGTH,
              },
              pattern: {
                value: patterns.ROLE,
                message: errorTexts.ROLE.PATTERN,
              },
            }}
            onBlur={handlerInputSubmit}
          />
          <Input
            type={InputType.EMAIL}
            name={InputName.EMAIL}
            label="Email"
            isDisabled={true}
            placeholder="example@site.mail"
            register={register}
            errorObject={errors[InputName.EMAIL]}
            // validOptions={{
            //   minLength: {
            //     value: 5,
            //     message: errorTexts.EMAIL.LENGTH,
            //   },
            //   maxLength: {
            //     value: 80,
            //     message: errorTexts.EMAIL.LENGTH,
            //   },
            //   required: errorTexts.EMPTY_FIELD.PATTERN,
            //   pattern: {
            //     value: patterns.EMAIL,
            //     message: errorTexts.EMAIL.PATTERN,
            //   },
            // }}
            onBlur={handlerInputSubmit}
          />
          <InputPhoneTemplate onBlur={handleInputPhoneSubmit} />
        </form>
      </section>

      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Доступность"
          description="Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды."
        />
        <form className={styles.profile__form}>
          <InputTimezoneSelect
            name={InputName.TIMEZONE}
            label="Часовой пояс"
            handleChange={handlerInputZoneSubmit}
          />
          <InputTimeSelect
            names={[InputName.WORK_START, InputName.WORK_FINISH]}
            label="График работы"
            handleChange={handlerInputWorkTimeSubmit}
          />
        </form>
      </section>

      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Смена пароля"
          description="На ваш email сразу придет ссылка для смены пароля."
        />

        <form
          onSubmit={updatePasswordForm.handleSubmit(handlerFormPasswordSubmit)}
          className={styles.profile__form}
        >
          <Input
            type={InputType.PASSWORD}
            name={InputName.CURRENT_PASSWORD}
            label="Текущий пароль"
            register={updatePasswordForm.register}
            isPassword={true}
            placeholder=""
            useTogglePassword={true}
            errorObject={
              updatePasswordForm.formState.errors[InputName.CURRENT_PASSWORD]
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
              validate: (value: string, formValues: UpdatePasswordData) =>
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
};
