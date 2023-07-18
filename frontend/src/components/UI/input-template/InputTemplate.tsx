import { nanoid } from 'nanoid';
import React from 'react';
import styles from './InputTemplate.module.scss';
import clsx from 'clsx';
import { input, isValid } from 'src/typings/constants';

import {ReactComponent as Toogle} from 'assets/toogle.svg';

type InputProps = {
  type: string,
  name: string,
  label: string,
  isValid?: Nullable<isValid>,
  placeholder?: string,
  helperText?: string,
  errorText?: string,
  value?: string,
  ref?: unknown,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
  onToogle?: () => void
}

export const Input:React.FC<InputProps> = (props) => {
  const inputId = nanoid();

  return (
    <div className={styles.input__wrapper}>
      <div className={styles.input__content}>
        <label
          className={styles.input__label}
          htmlFor={inputId}
        >
          {props.label}
        </label>
        <input
          className={clsx(
            styles.input__field,
            {
              [styles.input__field_valid]: props.isValid == isValid.VALID,
              [styles.input__field_invalid]: props.isValid == isValid.INVALID
            }
          )}
          type={props.type}
          name={props.name}
          id={inputId}
          value={props.value}
          placeholder={props.placeholder || ''}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onClick={props.onClick}
        />

        {props.name === input.PASSWORD &&
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
            [styles.input__helperText_valid]: props.isValid == isValid.VALID,
            [styles.input__helperText_invalid]: props.isValid == isValid.INVALID
          }
        )}>
          {props.helperText}
        </div>
      }
      {(props.errorText && props.isValid == isValid.INVALID) &&
        <div className={styles.input__errorText}>
          {props.errorText}
        </div>
      }
    </div>
  )
}