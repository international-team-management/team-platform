import React from 'react';
import {InputPhoneTemplate} from '../UI/phone-input-template/InputPhoneTemplate';
import {ProfileSectionTitle} from 'src/components/profile-section-title/ProfileSectionTitle';
import { ProfileMenu } from 'src/components/profile-menu/ProfileMenu';
import InputTimezoneSelect from "../UI/timezone-input-template/InputTimezoneSelect";
import InputTimeSelect from "../UI/time-input-template/InputTimeSelect";
import { Input } from '../UI/input-template/InputTemplate';
import { InputType,  InputName} from "src/typings/constants";
import styles from "./ProfileForm.module.scss";
import userAvatar from 'src/assets/framed-avatar.svg';
import {helperTexts} from 'utils/validation/helperTexts';
import { useForm } from "react-hook-form";
import { RegisterRequestData, ProfileRequestData } from "src/services/api/types";


export function ProfileForm(): React.ReactNode {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: {errors}
  } = useForm<ProfileRequestData>(
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
            type={InputType.TEXT}
            name={InputName.FIRST_NAME}
            label='Имя'
            placeholder='Иван'
            register={register}
            errors={errors[InputName.FIRST_NAME]}
          />
          <Input
            type={InputType.TEXT}
            name={InputName.LAST_NAME}
            label='Фамилия'
            placeholder='Иванов'
            register={register}
            errors={errors[InputName.LAST_NAME]}
          />
          <Input
            type={InputType.TEXT}
            name={InputName.JOB_TITLE}
            label='Должность'
            placeholder='Ваша должность'
            register={register}
            errors={errors[InputName.JOB_TITLE]}
          />
          <Input
            type={InputType.EMAIL}
            name={InputName.EMAIL}
            label='Email'
            placeholder='example@site.mail'
            register={register}
            errors={errors[InputName.EMAIL]}
          />
          <InputPhoneTemplate />
        </form>
      </section>
          
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle='Доступность'
          description='Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды'
        />
        <form className={styles.profile__form}>
          <InputTimezoneSelect label='Часовой пояс'/>
          <InputTimeSelect label='График работы'/>
        </form>
      </section>
      
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle='Смена пароля'
          description='На ваш email сразу придет ссылка для смены пароля'
        />

        <form className={styles.profile__form}>
          <Input
            type={InputType.PASSWORD}
            name={InputName.PASSWORD}
            label='Текущий пароль'
            register={register}
            errors={errors[InputName.PASSWORD]}
          />
          <Input
            type={InputType.PASSWORD}
            name={InputName.NEW_PASSWORD}
            label='Новый пароль'
            helperText={helperTexts.PASSWORD}
            register={register}
            errors={errors[InputName.NEW_PASSWORD]}
          />
          <Input
            type={InputType.PASSWORD}
            name={InputName.CONFIRM_PASSWORD}
            label='Повторите новый пароль'
            register={register}
            errors={errors[InputName.CONFIRM_PASSWORD]}
          />
          <button className={styles['profile__button_light-blue']}>Сменить пароль</button>
        </form>
      </section>
      
    </>
  )
}
