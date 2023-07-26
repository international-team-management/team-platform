import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import styles from './InputPhoneTemplate.module.scss';

export const InputPhoneTemplate = () => {
  const [phone, setPhone] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleDropdownOpen = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <div className={styles['phone-info']}>
      <label className={styles['phone-info__special-label']} htmlFor="phone-input">Телефон</label>
      <PhoneInput
        containerClass={styles['phone-info__container']}
        inputClass={styles['phone-info__input']}
        buttonClass={styles['phone-info__button']}
        specialLabel='Телефон'
        value={phone}
        onChange={handlePhoneChange}
        required
        dropdownClass={styles['phone-info__country-list']}
        searchClass={styles['phone-info__search-field']}
        localization={ru}
        country={'ru'}
        placeholder={phone ? "" : "+7 XXX XXX–XX–XX"}
      />
    </div>
  );
};