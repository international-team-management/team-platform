import React, { MutableRefObject } from 'react';
import styles from './InputTemplate.module.scss';
import clsx from 'clsx';

import {ReactComponent as Toogle} from 'assets/toogle.svg';

type InputProps = {
  type: string,
  name: string,
  label: string,
  isValid?: boolean | undefined,
  isEmpty?: boolean,
  isPassword?: boolean,
  useTogglePassword?: boolean,
  placeholder?: string,
  helperText?: string,
  errorText?: string,
  value?: string,
  innerRef?: unknown,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
  onToogle?: () => void
}

export const Input = (props:InputProps, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
  // const {ref, ...rest} = register(props.name);

  return (
    <div className={styles.input__wrapper}>
      <div className={styles.input__content}>
        <label
          className={styles.input__label}
        >
          {props.label}
        </label>
        <input
          className={clsx(
            styles.input__field,
            {
              [styles.input__field_valid]: props.isValid === true,
              [styles.input__field_invalid]:  props.isValid === false
            }
          )}
          // {...rest}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder || ''}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onClick={props.onClick}
          ref={ref}
        />

        {(props.isPassword && props.useTogglePassword) &&
          <div
            className={clsx(
              styles.input__tooglePassword
            )}
            onClick={props.onToogle}
          >
            <Toogle />
          </div>
        }
      </div>
      {props.helperText &&
        <div className={clsx(
          styles.input__helperText,
          {
            [styles.input__helperText_valid]: props.isValid === true,
            [styles.input__helperText_invalid]: props.isValid === false
          }
        )}>
          {props.helperText}
        </div>
      }
      {(props.errorText && props.isValid === false) &&
        <div className={styles.input__errorText}>
          {props.errorText}
        </div>
      }
    </div>
  )
}

export const MyInput = React.forwardRef(Input);
