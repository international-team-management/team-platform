import {ButtonTemplate} from 'src/components/UI/button-template/ButtonTemplate';
import {Input} from 'src/components/UI/input-template/InputTemplate';
import {input} from 'src/typings/constants';
import styles from './SignUpPage.module.scss';
import {TitleTemplate} from 'src/components/UI/title-template/TitleTemplate';
import {helperTexts} from 'utils/validation/helperTexts';
import promo from '../../assets/Promo.png';
import { Link } from 'react-router-dom';
import { routes } from "src/routes";

export const SignUpPage = () => {

  return (
    <main className={styles['sign-up-page']}>
      <img src={promo} className={styles['sign-up-page__promo']} alt="promo" />
      <form className={styles['sign-up-page__wrapper']}>
        <TitleTemplate
          text='Добро пожаловать'
          descrption='Создайте аккаунт и начните работу с командой'
        />
        <div className={styles['sign-up-page__inputs']}>
          <Input
            type={input.TEXT}
            name='first_name'
            label='Имя'
            placeholder='Иван'
          />
          <Input
            type={input.TEXT}
            name='second_name'
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
        </div>
        <div className={styles['sign-up-page__buttons']}>
          <ButtonTemplate
            text='Создать аккаунт'
            isDisabled={false}
          />
          <div className={styles['sign-up-page__text']}>
            <span className={styles['sign-up-page__question']}>Уже есть аккаунт?</span>
            <Link to={routes["sign-in"].path} className={styles['sign-up-page__redirect']}>Войдите</Link>
          </div>
        </div>
        <p className={styles['sign-up-page__agreement']}>
          Создавая аккаунт, вы&nbsp;соглашаетесь 
          с&nbsp;Условиями использования и&nbsp;Политикой конфиденциальности
        </p>
      </form>
    </main>
  )
}
