import { ChangeEvent, useState } from "react";
import { Link } from 'react-router-dom';
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { Input } from "src/components/UI/input-template/InputTemplate";
import { input } from "src/typings/constants";
import { routes } from "src/routes";
import styles from './LoginPage.module.scss';
import { TitleTemplate } from "src/components/UI/title-template/TitleTemplate";
import { useForm } from "react-hook-form";
import { LoginRequestData } from "src/services/api/types";
import { DevTool } from "@hookform/devtools";
import { errorTexts, helperTexts } from "src/utils/validation/helperTexts";
import { patterns } from "src/utils/validation/patterns";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const [emptyPassword, setEmptyPassword] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState<boolean | undefined>(undefined);
  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>(undefined);

  const {
    register,
    reset,
    control,
    handleSubmit,
    getFieldState,
    formState: {errors}
  } = useForm<LoginRequestData>(
    {mode: 'onChange', criteriaMode: 'all'}
  );

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  }

  const handlerInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value.length;
    // result ? setTogglePassword(true) : setTogglePassword(false);

    if (result) {
      setTogglePassword(true);
      setEmptyPassword(true)
    } else {
      setTogglePassword(false);
      setEmptyPassword(false)
    }

    setIsValidPassword(!getFieldState('password').invalid)
  }

  const handlerFormSubmit = (data:LoginRequestData) => {
    console.log(data);
    reset();
  }

  const handlerInputLogin = () => {
    // const result = e.currentTarget.value.length;
    // result ? setEmptyLogin(false) : setEmptyLogin(true);
    setIsValidEmail(!getFieldState('login').invalid);
  }

  return (
    <main className={styles.login}>
      <form className={styles.login__wrapper} onSubmit={handleSubmit(handlerFormSubmit)}>
        <TitleTemplate
          text='Вход'
        />
        <div className={styles.login__inputs}>
          <Input
            register={register}
            errors={errors}
            validOptions={             {
              onChange: () => handlerInputLogin(),
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.EMAIL,
                message: errorTexts.EMAIL.PATTERN
              }
            }}
            name={input.EMAIL}
            type={input.EMAIL}
            label='Email'
            placeholder='Введите email'
            // isEmpty={emptyLogin}
            isValid={isValidEmail}
          />
          <Input
            register={register}
            errors={errors}
            validOptions={              {
              onChange: (e: ChangeEvent<HTMLInputElement>) => handlerInputPassword(e),
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.PASSWORD,
                message: errorTexts.PASSWORD.PATTERN
              }
            }}
            name={input.PASSWORD}
            type={!showPassword ? input.PASSWORD : input.TEXT}
            label='Пароль'
            helperText={helperTexts.PASSWORD}
            placeholder='Введите пароль'
            isPassword={true}
            onToogle={showPasswordHandler}
            isToggle={!showPassword}
            isEmpty={emptyPassword}
            useTogglePassword={togglePassword}
            isValid={isValidPassword}
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
      <DevTool control={control} />
    </main>
  )
}
