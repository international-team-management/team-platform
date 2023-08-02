import { ButtonTemplate } from 'src/components/UI/button-template/ButtonTemplate';
import { Input } from 'src/components/UI/input-template/InputTemplate';
import { InputType, InputName } from 'src/typings/constants';
import styles from './SignUpPage.module.scss';
import { TitleTemplate } from 'src/components/UI/title-template/TitleTemplate';
import promo from '../../assets/Promo.png';
import { Link } from 'react-router-dom';
import { routes } from 'src/routes';
import { useForm } from 'react-hook-form';
import { RegisterRequestData } from 'src/services/api/types';
import { DevTool } from '@hookform/devtools';
import { errorTexts, helperTexts } from 'src/utils/validation/helperTexts';
import { patterns } from 'src/utils/validation/patterns';

export const SignUpPage = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterRequestData>({ mode: 'onChange', criteriaMode: 'all' });

  const handlerFormSubmit = (data: RegisterRequestData) => {
    getValues(InputName.FIRST_NAME).trim();
    getValues(InputName.LAST_NAME).trim();
    console.log(data);
    reset();
  };

  return (
    <main className={styles['sign-up-page']}>
      <img src={promo} className={styles['sign-up-page__promo']} alt="promo" />
      <form
        className={styles['sign-up-page__wrapper']}
        onSubmit={handleSubmit(handlerFormSubmit)}
      >
        <TitleTemplate
          text="Добро пожаловать"
          descrption="Создайте аккаунт и начните работу с командой"
        />
        <div className={styles['sign-up-page__inputs']}>
          <Input
            type={InputType.TEXT}
            name={InputName.FIRST_NAME}
            label="Имя"
            placeholder="Иван"
            register={register}
            errorObject={errors[InputName.FIRST_NAME]}
            validOptions={{
              minLength: {
                value: 1,
                message: errorTexts.FIRST_NAME.LENGTH,
              },
              maxLength: {
                value: 30,
                message: errorTexts.FIRST_NAME.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.NAME,
                message: errorTexts.FIRST_NAME.PATTERN,
              },
            }}
          />
          <Input
            type={InputType.TEXT}
            name={InputName.LAST_NAME}
            label="Фамилия"
            placeholder="Иванов"
            register={register}
            errorObject={errors[InputName.LAST_NAME]}
            validOptions={{
              minLength: {
                value: 1,
                message: errorTexts.LAST_NAME.LENGTH,
              },
              maxLength: {
                value: 30,
                message: errorTexts.LAST_NAME.LENGTH,
              },
              required: errorTexts.EMPTY_FIELD.PATTERN,
              pattern: {
                value: patterns.NAME,
                message: errorTexts.LAST_NAME.PATTERN,
              },
            }}
          />
          <Input
            type={InputType.EMAIL}
            name={InputName.EMAIL}
            label="Email"
            placeholder="example@site.mail"
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
          />
          <Input
            type={InputType.PASSWORD}
            name={InputName.PASSWORD}
            label="Пароль"
            isPassword={true}
            placeholder=""
            helperText={[
              helperTexts.PASSWORD_LENGTH,
              helperTexts.PASSWORD_SYMBOLS,
            ]}
            register={register}
            errorObject={errors[InputName.PASSWORD]}
            useTogglePassword={true}
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              minLength: {
                value: 8,
                message: errorTexts.PASSWORD.LENGTH,
              },
              maxLength: {
                value: 22,
                message: errorTexts.PASSWORD.LENGTH,
              },
              pattern: {
                value: patterns.PASSWORD,
                message: errorTexts.PASSWORD.PATTERN,
              },
            }}
          />
          <Input
            type={InputType.PASSWORD}
            name={InputName.CONFIRM_PASSWORD}
            label="Повторите пароль"
            register={register}
            errorObject={errors[InputName.CONFIRM_PASSWORD]}
            isPassword={true}
            placeholder=""
            useTogglePassword={true}
            getValues={getValues}
            validOptions={{
              required: errorTexts.EMPTY_FIELD.PATTERN,
              validate: (value: string, formValues: RegisterRequestData) =>
                value !== formValues.password
                  ? errorTexts.PASSWORD.CONFIRM
                  : true,
            }}
          />
        </div>
        <div className={styles['sign-up-page__buttons']}>
          <ButtonTemplate text="Создать аккаунт" isDisabled={false} />
          <div className={styles['sign-up-page__text']}>
            <span className={styles['sign-up-page__question']}>
              Уже есть аккаунт?
            </span>
            <Link
              to={routes['sign-in'].path}
              className={styles['sign-up-page__redirect']}
            >
              Войдите
            </Link>
          </div>
        </div>
        <p className={styles['sign-up-page__agreement']}>
          Создавая аккаунт, вы соглашаетесь <br />с Условиями использования и
          Политикой конфиденциальности
        </p>
      </form>
      <DevTool control={control} />
    </main>
  );
};
