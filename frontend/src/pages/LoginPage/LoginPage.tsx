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
            name={input.EMAIL}
            type={input.EMAIL}
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
            name={input.PASSWORD}
            type={input.PASSWORD}
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
