import { ChangeEvent, useState, useRef } from "react"
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { Input } from "src/components/UI/input-template/InputTemplate"
import { input } from "src/typings/constants";
// import { helperTexts } from "src/utils/validation/helperTexts";
import styles from './LoginPage.module.scss';
import { TitleTemplate } from "src/components/UI/title-template/TitleTemplate";

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
      <div className={styles.login__wrapper}>
        <TitleTemplate 
          text='Вход'
        />
        <div>
          <Input
            type={input.EMAIL}
            name='name'
            label='Email'
            value={emailValue}
            placeholder='Введите email'
            helperText={''}
            isValid={undefined}
            onChange={emailHandler}
          />
          <Input
            type={!showPassword ? input.PASSWORD : input.TEXT}
            name="password"
            label='Пароль'
            placeholder='Введите пароль'
            isPassword={true}
            isValid={undefined}
            innerRef={password}
            onToogle={showPasswordHandler}
          />
          <button className={styles.login__button}>Забыли пароль?</button>
        </div>
        <div className={styles.login__buttons}>
          <ButtonTemplate
            text="Войти"
            isDisabled={false}
          />
          <button className={styles.login__button_redirect}>Не зарегистрированы? Создайте аккаунт</button>
        </div>
      </div>
    </main>
  )
}
