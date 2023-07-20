import React, {useState} from 'react';
import {ButtonTemplate} from 'src/components/UI/button-template/ButtonTemplate';
import {Input} from 'src/components/UI/input-template/InputTemplate';
import {input} from 'src/typings/constants';
import styles from './SignUpPage.module.scss';
import {TitleTemplate} from 'src/components/UI/title-template/TitleTemplate';
import {helperTexts} from 'utils/validation/helperTexts';

export const SignUpPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <main className={styles['sign-up-page']}>
      <div className={styles['sign-up-page__wrapper']}>
        <TitleTemplate
          text='Регистрация'
        />
        <div className={styles['sign-up-page__inputs']}>
          <Input
            type={input.TEXT}
            name='name'
            label='Имя'
            placeholder='Иван'
          />
          <Input
            type={input.TEXT}
            name='surname'
            label='Фамилия'
            placeholder='Иванов'
          />
          <Input
            type={input.EMAIL}
            name='email'
            label='Email'
            placeholder='example@site.mail'
          />
          <Input
            type={input.PASSWORD}
            name='password'
            label='Пароль'
            helperText={helperTexts.PASSWORD}
          />
          <Input
            type={input.PASSWORD}
            name='repeat-password'
            label='Повторите пароль'
          />
          <div className={styles['sign-up-page__checkbox']}>
            <div className={styles['sign-up-page__input-checkbox-area']}>
              <input
                className={styles['sign-up-page__input-checkbox']}
                id='checkbox'
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor='checkbox'></label>
            </div>
            <div>
              Я соглашаюсь с <a className={styles['sign-up-page__button_redirect']} href='#'>
              Условиями использования</a> <br/> и <a className={styles['sign-up-page__button_redirect']} href='#'>Политикой
              конфиденциальности</a>
            </div>
          </div>
        </div>
        <div className={styles['sign-up-page__buttons']}>
          <ButtonTemplate
            text='Зарегистрироваться'
            isDisabled={false}
          />
          <button className={styles['sign-up-page__button_redirect']}>
            Уже&nbsp;зарегистрированы? <br/> Войдите в&nbsp;аккаунт
          </button>
        </div>
      </div>
    </main>
  )
}
