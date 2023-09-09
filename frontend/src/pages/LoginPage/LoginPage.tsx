import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonTemplate } from 'src/components/UI/button-template/ButtonTemplate';
import { Input } from 'src/components/UI/input-template/InputTemplate';
import { InputType, InputName } from 'src/typings/constants';
import { routes } from 'src/routes';
import styles from './LoginPage.module.scss';
import { TitleTemplate } from 'src/components/UI/title-template/TitleTemplate';
import { useForm } from 'react-hook-form';
import { LoginRequestData } from 'src/services/api/types';
import { DevTool } from '@hookform/devtools';
import { errorTexts, helperTexts } from 'src/utils/validation/helperTexts';
import { patterns } from 'src/utils/validation/patterns';
import promo from '../../assets/Promo.png';
import { useDispatch, useSelector } from 'src/services/hooks';
import { authThunks, selectUserMe } from 'src/services/slices/authSlice';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMe = useSelector(selectUserMe);

  React.useEffect(() => {
    if (userMe) navigate(routes['canban'].path, { replace: true });
  }, [userMe, navigate]);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestData>({ mode: 'onChange', criteriaMode: 'all' });

  const handlerFormSubmit = (data: LoginRequestData) => {
    console.log(data);
    dispatch(authThunks.login(data));
    reset();
  };

  return (
    <section className={styles.login}>
      <img src={promo} className={styles.login__promo} alt="promo" />
      <form
        className={styles.login__wrapper}
        onSubmit={handleSubmit(handlerFormSubmit)}
      >
        <TitleTemplate
          text="С возвращением"
          descrption="Введите свои данные и войдите в аккаунт"
        />
        <div className={styles.login__inputs}>
          <Input
            register={register}
            errorObject={errors[InputName.EMAIL]}
            validOptions={{
              minLength: {
                value: 5,
                message: errorTexts.EMAIL.LENGTH,
              },
              maxLength: {
                value: 80,
                message: errorTexts.EMAIL.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.EMAIL,
                message: errorTexts.EMAIL.PATTERN,
              },
            }}
            name={InputName.EMAIL}
            type={InputType.EMAIL}
            label="Email"
            placeholder="example@site.mail"
          />
          <Input
            register={register}
            errorObject={errors[InputName.PASSWORD]}
            validOptions={{
              minLength: {
                value: 8,
                message: errorTexts.PASSWORD.LENGTH,
              },
              maxLength: {
                value: 22,
                message: errorTexts.PASSWORD.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.PASSWORD,
                message: errorTexts.PASSWORD.PATTERN,
              },
            }}
            name={InputName.PASSWORD}
            type={InputType.PASSWORD}
            label="Пароль"
            placeholder=""
            helperText={[
              helperTexts.PASSWORD_LENGTH,
              helperTexts.PASSWORD_SYMBOLS,
            ]}
            isPassword={true}
            useTogglePassword={true}
            labelPassword="Забыли пароль?"
          />
        </div>
        <div className={styles.login__buttons}>
          <ButtonTemplate text="Войти в аккаунт" isDisabled={false} />
          <div className={styles.login__text}>
            <span className={styles.login__question}>Еще нет аккаунта?</span>
            <Link
              to={routes['sign-up'].path}
              className={styles.login__redirect}
            >
              Зарегистрируйтесь
            </Link>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </section>
  );
};
