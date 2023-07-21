import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import './InputPhoneTemplate.modile.scss';
import 'react-phone-input-2/lib/style.css';


const InputPhoneTemplate = () => {
    return (
      <PhoneInput
        localization={ru}
        country={'ru'}
        placeholder={'+ 7  XXX XXX–XX–XX'}
      />
    );
  };


export default InputPhoneTemplate;