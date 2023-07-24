import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import './InputPhoneTemplate.modile.scss';

export const InputPhoneTemplate = () => {
    return (
      <PhoneInput
        localization={ru}
        country={'ru'}
        placeholder={'+ 7  XXX XXX–XX–XX'}
      />
    );
  };