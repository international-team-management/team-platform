import React from 'react';
import {
  useTimezoneSelect,
  allTimezones,
  ITimezoneOption,
} from 'react-timezone-select';
import Select, { SingleValue, ActionMeta } from 'react-select';
import styles from './InputTimezoneSelect.module.scss';
import './SelectTzComponent.scss'; // <-- Управление стилями компонента Select, модульно пока не получилось (https://react-select.com/styles#inner-components)

type InputTimezonePropsType = {
  name: string;
  label: string;
  handleChange: (data: SingleValue<ITimezoneOption>, name?: string) => void;
};

export const InputTimezoneSelect: React.FC<InputTimezonePropsType> = (
  props,
) => {
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

  const [tz] = React.useState(
    parseTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone),
  );

  const handleSelection = (
    choice: SingleValue<ITimezoneOption>,
    action: ActionMeta<ITimezoneOption>,
  ) => {
    props.handleChange(choice, action.name);
  };

  return (
    <label className={styles.tz}>
      <span>{props.label}</span>
      <Select
        unstyled={true}
        classNamePrefix={'tz-select'}
        options={options}
        defaultValue={tz}
        name={props.name}
        onChange={handleSelection}
      />
    </label>
  );
};
