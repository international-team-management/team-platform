import {ButtonTemplate} from 'src/components/UI/button-template/ButtonTemplate';
import {Input} from 'src/components/UI/input-template/InputTemplate';
import {input} from 'src/typings/constants';
import styles from './SignUpPage.module.scss';
import {TitleTemplate} from 'src/components/UI/title-template/TitleTemplate';
import {helperTexts} from 'utils/validation/helperTexts';
import promo from '../../assets/Promo.png';
import { Link } from 'react-router-dom';
import { routes } from "src/routes";
import { useForm } from 'react-hook-form';
import { RegisterRequestData } from 'src/services/api/types';

export const SignUpPage = () => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    getFieldState,
    formState: {errors}
  } = useForm<RegisterRequestData>(
    {mode: 'onChange', criteriaMode: 'all'}
  );

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
            name={input.FIRST_NAME}
            label='Имя'
            placeholder='Иван'
            register={register}
            errors={errors}
          />
          <Input
            type={input.TEXT}
            name={input.SECOND_NAME}
            label='Фамилия'
            placeholder='Иванов'
            register={register}
            errors={errors}
          />
          <Input
            type={input.EMAIL}
            name={input.EMAIL}
            label='Email'
            placeholder='example@site.mail'
            register={register}
            errors={errors}
          />
          <Input
            type={input.PASSWORD}
            name={input.PASSWORD}
            label='Пароль'
            helperText={helperTexts.PASSWORD}
            register={register}
            errors={errors}
          />
          <Input
            type={input.PASSWORD}
            name={input.CONFIRM_PASSWORD}
            label='Повторите пароль'
            register={register}
            errors={errors}
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
          Создавая аккаунт, вы соглашаетесь <br/>с Условиями использования и Политикой конфиденциальности
        </p>
      </form>
    </main>
  )
}
