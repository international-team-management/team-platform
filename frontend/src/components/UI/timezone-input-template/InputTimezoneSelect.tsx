import { useState } from 'react';
import {
  useTimezoneSelect,
  allTimezones,
  // ITimezoneOption,
} from 'react-timezone-select';
import Select from 'react-select';
import styles from './InputTimezoneSelect.module.scss';
import './SelectTzComponent.scss'; // <-- Управление стилями компонента Select, модульно пока не получилось (https://react-select.com/styles#inner-components)

type InputTimezonePropsType = {
  label: string;
};

export default function InputTimezoneSelect({
  label,
  ...props
}: InputTimezonePropsType) {
  const labelStyle = 'altName';
  const timezones = {
    ...allTimezones,
    'Asia/Tbilisi': 'Tbilisi',
  };
  const displayValue = 'UTC';
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle,
    timezones,
    displayValue,
  });

  const [tz, setTz] = useState(
    parseTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone),
  );

  return (
    <label className={styles.tz}>
      <span>{label}</span>
      <Select
        unstyled={true}
        classNamePrefix={'tz-select'}
        options={options}
        defaultValue={tz}
        {...props}
      />
    </label>
  );
}
