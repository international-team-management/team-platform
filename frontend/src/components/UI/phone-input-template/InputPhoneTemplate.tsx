import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import styles from './InputPhoneTemplate.module.scss';
import { InputName } from 'src/typings/constants';

type PropsType = {
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  lastPhoneChoice: string | undefined;
};

export const InputPhoneTemplate = (props: PropsType) => {
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {
    if (props.lastPhoneChoice) {
      setPhone(props.lastPhoneChoice);
    }
  }, [props.lastPhoneChoice]);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  return (
    <div className={styles['phone-info']}>
      <label
        className={styles['phone-info__special-label']}
        htmlFor="phone-input"
      >
        Телефон
      </label>
      <PhoneInput
        containerClass={styles['phone-info__container']}
        inputClass={styles['phone-info__input']}
        buttonClass={styles['phone-info__button']}
        specialLabel="Телефон"
        value={phone}
        onChange={handlePhoneChange}
        dropdownClass={styles['phone-info__country-list']}
        searchClass={styles['phone-info__search-field']}
        localization={ru}
        country={'ru'}
        placeholder={phone ? '' : '+7 XXX XXX–XX–XX'}
        inputProps={{ name: InputName.TELEPHONE }}
        {...props}
      />
    </div>
  );
};
