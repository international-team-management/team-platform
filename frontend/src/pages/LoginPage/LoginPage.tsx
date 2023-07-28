import { Link } from 'react-router-dom';
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { Input } from "src/components/UI/input-template/InputTemplate";
import { InputType, InputName } from "src/typings/constants";
import { routes } from "src/routes";
import styles from './LoginPage.module.scss';
import { TitleTemplate } from "src/components/UI/title-template/TitleTemplate";
import { useForm } from "react-hook-form";
import { LoginRequestData } from "src/services/api/types";
import { DevTool } from "@hookform/devtools";
import { errorTexts, helperTexts } from "src/utils/validation/helperTexts";
import { patterns } from "src/utils/validation/patterns";
import promo from '../../assets/Promo.png';

export const LoginPage = () => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginRequestData>(
    {mode: 'onChange', criteriaMode: 'all'}
  );

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  }

  const handlerInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value.length;

    if (result) {
      setTogglePassword(true);
      setEmptyPassword(true)
    } else {
      setTogglePassword(false);
      setEmptyPassword(false)
    }

    setIsValidPassword(!getFieldState(InputName.PASSWORD).invalid)
  }

  const handlerInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value.length;
    result ? setEmptyLogin(true) : setEmptyLogin(false);

    setIsValidEmail(!getFieldState(InputName.EMAIL).invalid);
  }

  const handlerFormSubmit = (data:LoginRequestData) => {
    console.log(data);
    reset();
  }

  return (
    <main className={styles.login}>
      <img src={promo} className={styles.login__promo} alt="promo" />
      <form className={styles.login__wrapper} onSubmit={handleSubmit(handlerFormSubmit)}>
        <TitleTemplate
          text='С возвращением'
          descrption='Введите свои данные и войдите в аккаунт'
        />
        <div>
          <Input
            register={register}
            errors={errors[input.EMAIL]}
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.EMAIL,
                message: errorTexts.EMAIL.PATTERN
              }
            }}
            name={InputName.EMAIL}
            type={InputType.EMAIL}
            label='Email'
            placeholder='example@site.mail'
          />
          <Input
            register={register}
            errors={errors[input.PASSWORD]}
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.PASSWORD,
                message: errorTexts.PASSWORD.PATTERN
              }
            }}
            name={InputName.PASSWORD}
            type={!showPassword ? InputType.PASSWORD : InputType.TEXT}
            label='Пароль'
            placeholder=''
            helperText={helperTexts.PASSWORD}
            isPassword={true}
            useTogglePassword={true}
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
      <DevTool control={control} />
    </main>
  )
}
