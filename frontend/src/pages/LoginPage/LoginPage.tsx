import { ChangeEvent, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { Input } from "src/components/UI/input-template/InputTemplate";
import { input } from "src/typings/constants";
import { routes } from "src/routes";
// import { helperTexts } from "src/utils/validation/helperTexts";
import styles from './LoginPage.module.scss';
import { TitleTemplate } from "src/components/UI/title-template/TitleTemplate";
import promo from '../../assets/Promo.png';

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const password = useRef();

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailValue(value);
  }

  const showPasswordHandler = () => {
    console.log('click')
    setShowPassword(!showPassword);
  }

  return (
    <main className={styles.login}>
      <img src={promo} className={styles.login__promo} alt="promo" />
      <form className={styles.login__wrapper}>
        <TitleTemplate 
          text='С возвращением'
          descrption='Введите свои данные и войдите в аккаунт'
        />
        <div>
          <Input
            type={input.EMAIL}
            name='name'
            label='Email'
            value={emailValue}
            placeholder='example@site.mail'
            helperText={''}
            isValid={undefined}
            onChange={emailHandler}
          />
          <Input
            type={!showPassword ? input.PASSWORD : input.TEXT}
            name="password"
            label='Пароль'
            placeholder=''
            isPassword={false}
            isValid={undefined}
            innerRef={password}
            onToogle={showPasswordHandler}
            labelPassword='Забыли пароль?'
          />
        </div>
        <div className={styles.login__buttons}>
          <ButtonTemplate
            text="Войти в аккаунт"
            isDisabled={false}
          />
          <div className={styles.login__text}>
            <span className={styles.login__question}>Еще нет аккаунта?</span>
            <Link to={routes["sign-up"].path} className={styles.login__redirect}>Зарегистрируйтесь</Link>
          </div>
        </div>
      </form>
    </main>
  )
}
