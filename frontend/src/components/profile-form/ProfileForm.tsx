import React from "react";
import { InputPhoneTemplate } from "../UI/phone-input-template/InputPhoneTemplate";
import { ProfileMenu } from 'src/components/profile-menu/ProfileMenu';
import { ProfileSectionTitle } from "src/components/profile-section-title/ProfileSectionTitle";
import { Input } from '../UI/input-template/InputTemplate';
import { input } from "src/typings/constants";
import styles from "./ProfileForm.module.scss";
import { useForm } from "react-hook-form";
import { RegisterRequestData } from "src/services/api/types";
import { helperTexts } from "src/utils/validation/helperTexts";

export function ProfileForm(): React.ReactNode {
  const {
    register,
    reset,
    control,
    handleSubmit,
    getFieldState,
    formState: {errors}
  } = useForm<RegisterRequestData>(
    {mode: 'onChange', criteriaMode: 'all'}
  );

  return (
    <>
      <ProfileMenu isChange={false} />
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Фото профиля"
          description="По&nbsp;реальной фотографии коллеги смогут легко узнать вас"
        />
        <form className={styles.profile__form_photo}>
          <img className={styles.profile__img} alt="Фото" src="#"/>
          <div className={styles.profile__buttons}>
            <button className={styles.profile__button_blue}>Загрузить фотографию</button>
            <button className={styles.profile__button_red}>Удалить фотографию</button>
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
            errors={errors}
          />
          <Input
            type={input.TEXT}
            name={input.SECOND_NAME}
            label='Фамилия'
            placeholder='Иванов'
            register={register}
            errors={errors}
          />
          <Input
            type={input.EMAIL}
            name={input.EMAIL}
            label='Email'
            placeholder='example@site.mail'
            register={register}
            errors={errors}
          />
          <Input
            type={input.PASSWORD}
            name={input.PASSWORD}
            label='Пароль'
            helperText={helperTexts.PASSWORD}
            register={register}
            errors={errors}
          />
          <h3 className={styles.profile__phone}>Телефон</h3>
          <InputPhoneTemplate/>
        </form>
      </section>
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle="Доступность"
          description="Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды"
        />
        <form className={styles.profile__form_availability}>

        </form>
      </section>
    </>
  )
}
