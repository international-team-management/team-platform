import React from 'react';
import {InputPhoneTemplate} from '../UI/phone-input-template/InputPhoneTemplate';
import {ProfileSectionTitle} from 'src/components/profile-section-title/ProfileSectionTitle';
import {Input} from '../UI/input-template/InputTemplate';
import {input} from 'src/typings/constants';
import styles from './ProfileForm.module.scss';
import userAvatar from 'src/assets/framed-avatar.svg';

export function ProfileForm(): React.ReactNode {
  return (
    <>
      <section className={styles.profile__section}>

        <ProfileSectionTitle
          subtitle='Фото профиля'
          description='По&nbsp;реальной фотографии коллеги смогут легко узнать вас'
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
          subtitle='Личные данные'
          description='Эта информация будет доступна всем участникам проекта'
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
            label='Должность'
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
          <InputPhoneTemplate/>
        </form>
      </section>
      <section className={styles.profile__section}>
        <ProfileSectionTitle
          subtitle='Доступность'
          description='Текущая локация и&nbsp;актуальный график работы помогут точнее расчитать пересечение команды'
        />
        <form className={styles.profile__form_availability}>

        </form>
      </section>
    </>
  )
}