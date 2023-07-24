import { ChangeEvent, useState } from "react";
import { Link } from 'react-router-dom';
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { MyInput } from "src/components/UI/input-template/InputTemplate";
import { input } from "src/typings/constants";
import { routes } from "src/routes";
// import { helperTexts } from "src/utils/validation/helperTexts";
import styles from './LoginPage.module.scss';
import { TitleTemplate } from "src/components/UI/title-template/TitleTemplate";
import { useForm } from "react-hook-form";
import { LoginRequestData } from "src/services/api/types";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginRequestData>();

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  }

  const handlerInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value;

    (result && result.length > 0) ? setTogglePassword(true) : setTogglePassword(false);
  }

  const handlerFormSubmit = (data:LoginRequestData) => {
    console.log(errors)
    console.log(data)
  }

  return (
    <main className={styles.login}>
      <form className={styles.login__wrapper} onSubmit={handleSubmit(handlerFormSubmit)}>
        <TitleTemplate
          text='Вход'
        />
        <div className={styles.login__inputs}>
          <MyInput
            {...register(
              'login',
              {required: true}
            )}
            type={input.EMAIL}
            label='Email'
            placeholder='Введите email'
            helperText={''}
            isValid={undefined}
          />
          <MyInput
            {...register(
              'password',
              {required: true}
            )}
            type={!showPassword ? input.PASSWORD : input.TEXT}
            label='Пароль'
            placeholder='Введите пароль'
            isPassword={true}
            isValid={undefined}
            onToogle={showPasswordHandler}
            onChange={(e) => handlerInputPassword(e)}
            useTogglePassword={togglePassword}
          />
          <button className={styles.login__button} type="submit">Забыли пароль?</button>
        </div>
        <div className={styles.login__buttons}>
          <ButtonTemplate
            text="Войти"
            isDisabled={false}
          />
          <Link to={routes["sign-up"].path} className={styles.login__button_redirect} >Не зарегистрированы? Создайте аккаунт</Link>
        </div>
      </form>
    </main>
  )
}
