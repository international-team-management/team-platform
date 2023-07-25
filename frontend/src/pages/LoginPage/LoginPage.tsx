import { ChangeEvent, useState, useRef, SyntheticEvent } from "react";
import { Link } from 'react-router-dom';
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { Input } from "src/components/UI/input-template/InputTemplate";
import { input } from "src/typings/constants";
import { routes } from "src/routes";
// import { helperTexts } from "src/utils/validation/helperTexts";
import styles from './LoginPage.module.scss';
import { TitleTemplate } from "src/components/UI/title-template/TitleTemplate";

import { useFormValidation } from "src/services/hooks";

export const LoginPage = () => {
  // const [emailValue, setEmailValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);
  const password = useRef();

  const {
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setIsValid,
    handleChange
  } = useFormValidation();

  // const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   // setEmailValue(value);
  // }

  const showPasswordHandler = () => {
    console.log('click')
    setShowPassword(!showPassword);
  }

  const handlerSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const entriesArr: Array<[string, string]> = Object.entries(values);

    entriesArr.forEach(item => {
      const [key, value] = item;
      console.log(key)
      if(value === undefined || value.length === 0) {
        console.log(key)
        setErrors({...errors, [key]: true})
        console.log(errors)
      }
    })

    setDisabledForm(true);
    console.log(values);
    setDisabledForm(false)
  }



  return (
    <main className={styles.login}>
      <form className={styles.login__wrapper} onSubmit={handlerSubmit} noValidate>
        <TitleTemplate
          text='Вход'
        />
        <div>
          <Input
            type={input.EMAIL}
            name='email'
            label='Email'
            value={values.email}
            placeholder='Введите email'
            helperText={''}
            isValid={errors.email !== undefined ? !errors.email : undefined}
            onChange={handleChange}
            errorText="Not valid"
            required={true}
            disabled={disabledForm}
            pattern="^[\\w.\\-]+@[a-zA-Z\\d_\\-]+?(?:\\.[a-zA-Z]{2,4})+$"
            // onChange={emailHandler}
          />
          <Input
            type={!showPassword ? input.PASSWORD : input.TEXT}
            name="password"
            label='Пароль'
            value={values.password}
            placeholder='Введите пароль'
            isPassword={true}
            onChange={handleChange}
            isValid={errors.password !== undefined ? !errors.password : undefined}
            innerRef={password}
            onToogle={showPasswordHandler}
            errorText="Not valid"
            required={true}
            pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/"
            disabled={disabledForm}
          />
          <button className={styles.login__button}>Забыли пароль?</button>
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
