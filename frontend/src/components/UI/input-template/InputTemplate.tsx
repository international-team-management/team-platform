import React from 'react';
import styles from './InputTemplate.module.scss';
import clsx from 'clsx';

import { ReactComponent as Eye } from 'assets/eye.svg';
import { ReactComponent as EyeOff } from 'assets/eye-off.svg';
import { InputName } from 'src/typings/constants';

type InputProps = {
  type: string;
  name: string;
  label: string;
  labelPassword?: string;
  isPassword?: boolean;
  isToggle?: boolean;
  useTogglePassword?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  helperText?: string[];
  errorText?: string;
  register: any;
  errorObject: any;
  validOptions?: any;
  value?: string;
  innerRef?: unknown;
  getValues?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  const [valueHasChanged, setValueHasChanged] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isToggleEye, setToggleEye] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(() => {
    const errorTypes = Object.keys(props.errorObject?.types || {});

    const errorMessages: string[] = errorTypes.map((errorType) => {
      const validateData = props.validOptions[errorType];

      switch (typeof validateData) {
        case 'string':
          return validateData;
        case 'object':
          return String(validateData.message);
        case 'function':
          if (props.getValues) {
            return validateData(value, props.getValues());
          } else {
            throw Error(
              'Prop "getValues" is required if you use "validOptions.validate"',
            );
          }
        default:
          throw Error('Unsupported type of error');
      }
    });

    setErrors(errorMessages);
  }, [props, value]);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValueHasChanged(true);
    setValue(e.target.value);

    if (props.validOptions?.onChange) {
      props.validOptions.onChange(e);
    }
  }

  return (
    // TODO: split the complex component into simple components

    <div className={styles.input__wrapper}>
      <div className={styles.input__content}>
        {/* ! It could be part of a Password component */}

        <div className={styles.input__label_wrapper}>
          <label className={styles.input__label}>{props.label}</label>
          {props.labelPassword && (
            <button className={styles.input__label_password}>
              {props.labelPassword}
            </button>
          )}
        </div>

        {/* ! It could be part of a Input component */}

        <input
          className={clsx(styles.input__field, {
            [styles.input__field_valid]: !props.errorObject && valueHasChanged,
            [styles.input__field_invalid]: props.errorObject,
          })}
          type={isToggleEye ? 'text' : props.type}
          disabled={props.isDisabled}
          placeholder={props.placeholder || ''}
          {...props.register(props.name, {
            ...props.validOptions,
            onChange: onChangeHandler,
            onBlur: props.onBlur,
          })}
        />

        {/* ! It could be part of a Password component */}

        {props.isPassword && props.useTogglePassword && value !== '' && (
          <div
            className={clsx(styles.input__tooglePassword)}
            onClick={() => setToggleEye(!isToggleEye)}
          >
            {!isToggleEye ? <Eye /> : <EyeOff />}
          </div>
        )}
      </div>

      {/* ! It could be part of Validation & Helper text component */}

      {props.helperText && !props.errorObject && (
        <>
          {props.helperText.map((helperText) => {
            return (
              <div
                key={helperText}
                className={clsx(styles.input__helperText, {
                  [styles.input__helperText_password]:
                    props.name === InputName.PASSWORD,
                  [styles.input__helperText_valid]:
                    !props.errorObject && valueHasChanged,
                  [styles.input__helperText_invalid]: props.errorObject,
                })}
              >
                {helperText}
              </div>
            );
          })}
        </>
      )}

      {/* ! It could be part of Validation & Error text component */}

      {errors.map((errorText) => {
        return (
          <div
            key={errorText}
            className={clsx(styles.input__errorText, {
              [styles.input__errorText_password]:
                props.name === InputName.PASSWORD && valueHasChanged,
            })}
          >
            {errorText}
          </div>
        );
      })}
    </div>
  );
};
