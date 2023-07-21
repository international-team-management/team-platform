import React from "react";
import MobilePhone from "../../components/UI/phone-input-template/InputPhoneTemplate";
import { ProfileMenu } from 'src/components/profile-menu/ProfileMenu';
import { ProfileSection } from "src/components/profile-section/ProfileSection";
import { Input } from '../UI/input-template/InputTemplate';
import { input } from "src/typings/constants";
import styles from "./ProfileForm.module.scss";

export function ProfileForm(): React.ReactNode {
  return (
    <>
      <ProfileMenu isChange={false} />
      <div className={styles.profile__section}>
        <ProfileSection 
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
      </div>
      <div className={styles.profile__section}>
        <ProfileSection 
          subtitle="Личные данные"
          description="Эта информация будет доступна всем участникам проекта"
        />
        <form className={styles.profile__form_data}>
          <Input 
            type={input.TEXT}
            name='first_name'
            label='Имя'
            placeholder='Ваше имя'
            helperText={''}
            isValid={undefined}
          />
          <Input 
            type={input.TEXT}
            name='second_name'
            label='Фамилия'
            placeholder='Ваша фамилия'
            helperText={''}
            isValid={undefined}
          />
          <Input 
            type={input.TEXT}
            name='position'
            label='Фамилия'
            placeholder='Ваша должность'
            helperText={''}
            isValid={undefined}
          />
          <Input 
            type={input.EMAIL}
            name='emali'
            label='Email'
            placeholder='Ваш Email'
            helperText={''}
            isValid={undefined}
          />
          <h3 className={styles.profile__phone}>Телефон</h3>
          <MobilePhone/>
        </form>
      </div>
      <div className={styles.profile__section}>
        <ProfileSection 
          subtitle="Доступность"
          description="Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды"
        />
        <form className={styles.profile__form_availability}>
          
        </form>
      </div>
    </>
  )
}