import React from 'react';
import styles from './InputTemplate.module.scss';
import clsx from 'clsx';

import {ReactComponent as Eye} from 'assets/eye.svg';
import {ReactComponent as EyeOff} from 'assets/eye-off.svg';
import { input } from 'src/typings/constants';

type InputProps = {
  type: string,
  name: string,
  label: string,
  labelPassword?: string,
  isPassword?: boolean,
  isToggle?: boolean,
  useTogglePassword?: boolean,
  placeholder?: string,
  helperText?: string,
  errorText?: string,
  // TODO: добавить типизацию
  register: any,
  errors: any,
  validOptions?: any,
  value?: string,
  innerRef?: unknown,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
}

// export const Input = (props:InputProps, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
//   // const {ref, ...rest} = register(props.name);

//   return (
//     <div className={styles.input__wrapper}>
//       <div className={styles.input__content}>
//         <label
//           className={styles.input__label}
//         >
//           {props.label}
//         </label>
//         <input
//           className={clsx(
//             styles.input__field,
//             {
//               [styles.input__field_valid]: props.isValid === true,
//               [styles.input__field_invalid]:  props.isValid === false
//             }
//           )}
//           // {...rest}
//           name={props.name}
//           type={props.type}
//           placeholder={props.placeholder || ''}
//           onChange={props.onChange}
//           onBlur={props.onBlur}
//           onClick={props.onClick}
//           ref={ref}
//         />

//         {(props.isPassword && props.useTogglePassword) &&
//           <div
//             className={clsx(
//               styles.input__tooglePassword
//             )}
//             onClick={props.onToogle}
//           >
//             <Toogle />
//           </div>
//         }
//       </div>
//       {props.helperText &&
//         <div className={clsx(
//           styles.input__helperText,
//           {
//             [styles.input__helperText_valid]: props.isValid === true,
//             [styles.input__helperText_invalid]: props.isValid === false
//           }
//         )}>
//           {props.helperText}
//         </div>
//       }
//       {(props.errorText && props.isValid === false) &&
//         <div className={styles.input__errorText}>
//           {props.errorText}
//         </div>
//       }
//     </div>
//   )
// }

// export const MyInput = React.forwardRef(Input);


export const Input = (props:InputProps) => {
  const [valueHasChanged, setValueHasChanged] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isToggleEye, setToggleEye] = React.useState(false);
 
 
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValueHasChanged(true);
    setValue(e.target.value);

    if (props.validOptions?.onChange) {
      props.validOptions.onChange(e);
    }
  }

  return (
    <div className={styles.input__wrapper}>
      <div className={styles.input__content}>
        <div className={styles.input__label_wrapper}>
          <label
            className={styles.input__label}
          >
            {props.label}
          </label>
          <button
            className={styles.input__label_password}
          >
            {props.labelPassword}
          </button>
        </div>
        <input
          className={clsx(
            styles.input__field,
            {
              [styles.input__field_valid]: !props.errors && valueHasChanged,
              [styles.input__field_invalid]: props.errors
            }
          )}
          // {...rest}
          type={isToggleEye ? 'text' : props.type}
          placeholder={props.placeholder || ''}
          {...props.register(
            props.name,
            {
              ...props.validOptions,
              onChange: onChangeHandler,
            }
          )}
        />

        {(props.isPassword && props.useTogglePassword && value !== '') &&
          <div
            className={clsx(
              styles.input__tooglePassword
            )}
            onClick={() => setToggleEye(!isToggleEye)}
          >
            {!isToggleEye ? <Eye /> : <EyeOff />}
          </div>
        }
      </div>
      {(props.helperText && !props.errors) &&
        // props.helperText.map((item, index) => {
        //   return (
        //     <div
        //       className={clsx(
        //         styles.input__helperText,
        //         {
        //           [styles.input__helperText_valid]: props.isValid !== undefined && props.isValid,
        //           [styles.input__helperText_invalid]: !!props.errors[props.name]
        //         }
        //       )}
        //       key={index}
        //     >
        //       {item}
        //     </div>
        //   )
        // })
        <div
          className={clsx(
            styles.input__helperText,
            {
              [styles.input__helperText_password]: props.name === input.PASSWORD,
              [styles.input__helperText_valid]: !props.errors && valueHasChanged,
              [styles.input__helperText_invalid]: props.errors
            }
          )}
        >
          {props.helperText}
        </div>
      }
      {props.errors &&
        <div className={clsx(
          styles.input__errorText,
          {
            [styles.input__errorText_password]: props.name === input.PASSWORD && valueHasChanged
          }
        )}>
          {props.errors.message}
        </div>
      }
    </div>
  )
}
