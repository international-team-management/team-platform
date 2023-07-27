import React from 'react';
import {InputPhoneTemplate} from '../UI/phone-input-template/InputPhoneTemplate';
import {ProfileSectionTitle} from 'src/components/profile-section-title/ProfileSectionTitle';
import { ProfileMenu } from 'src/components/profile-menu/ProfileMenu';
import { Input } from '../UI/input-template/InputTemplate';
import { input } from "src/typings/constants";
import styles from "./ProfileForm.module.scss";
import userAvatar from 'src/assets/framed-avatar.svg';
import {helperTexts} from 'utils/validation/helperTexts';
import { useForm } from "react-hook-form";
import { RegisterRequestData } from "src/services/api/types";

export function ProfileForm(): React.ReactNode {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: {errors}
  } = useForm<RegisterRequestData>(
    {mode: 'onChange', criteriaMode: 'all'}
  );

  return (
    <>
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Фото профиля"
          description="По&nbsp;реальной фотографии коллеги смогут легко узнать вас"
        />
        <form className={styles.profile__form_photo}>
          <img className={styles.profile__img} alt='Фото' src={userAvatar}/>
          <div className={styles.profile__buttons}>
            <button className={styles.profile__button_blue}>Загрузить фотографию</button>
          </div>
        </form>
      </section>

      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Личные данные"
          description="Эта информация будет доступна всем участникам проекта"
        />
        <form className={styles.profile__form_data}>
          <Input
            type={input.TEXT}
            name={input.FIRST_NAME}
            label='Имя'
            placeholder='Иван'
            register={register}
            errors={errors[input.FIRST_NAME]}
          />
          <Input
            type={input.TEXT}
            name={input.LAST_NAME}
            label='Фамилия'
            placeholder='Иванов'
            register={register}
            errors={errors[input.LAST_NAME]}
          />
          {/* <Input
            type={input.TEXT}
            name='position'
            label='Должность'
            placeholder='Ваша должность'
            helperText={''}
            isValid={undefined}
          /> */}
          <Input
            type={input.EMAIL}
            name={input.EMAIL}
            label='Email'
            placeholder='example@site.mail'
            register={register}
            errors={errors[input.EMAIL]}
          />
          <InputPhoneTemplate
            label='Телефон'
          />
        </form>
      </section>
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle='Доступность'
          description='Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды'
        />
        <form className={styles.profile__form}>
          {/* <Input
            type={input.TEXT}
            name='location'
            label='Локация'
            placeholder='Санкт-Петербург (UTC+3)'
            helperText={''}
            isValid={undefined}
          />
          <Input
            type={input.TEXT}
            name='schedule'
            label='График работы'
            helperText={''}
            isValid={undefined}
          /> */}
        </form>
      </section>
          
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle='Смена пароля'
          description='На ваш email сразу придет ссылка для смены пароля'
        />
        <form className={styles.profile__form}>
          <Input
            type={input.PASSWORD}
            name={input.PASSWORD}
            label='Пароль'
            helperText={helperTexts.PASSWORD}
            register={register}
            errors={errors[input.PASSWORD]}
          />
          {/* <Input
            type={input.PASSWORD}
            name='password'
            label='Текущий пароль'
          /> */}
          {/* <Input
            type={input.PASSWORD}
            name='password'
            label='Новый пароль'
            helperText={helperTexts.PASSWORD}
          />
          <Input
            type={input.PASSWORD}
            name='repeat-password'
            label='Повторите новый пароль'
          /> */}
          <button className={styles['profile__button_light-blue']}>Сменить пароль</button>
        </form>
      </section>
    </>
  )
}
