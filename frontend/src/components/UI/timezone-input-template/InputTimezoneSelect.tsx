import React, { useState } from "react";
import { nanoid } from 'nanoid';
import { useTimezoneSelect, allTimezones } from "react-timezone-select";
import styles from "./InputTimezoneSelect.module.scss";


type InputTimezonePropsType = {
  label: string
}

export default function InputTimezoneSelect(props: InputTimezonePropsType) {
  const labelStyle = "altName"
  const timezones = {
    ...allTimezones,
    'Asia/Tbilisi': 'Tbilisi',
  }
  const displayValue = "UTC"
  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones, displayValue })

  const [tz, setTz] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone  // returns the timezone of the device in the format 'Asia/Tbilisi'
  );

  return (

    <label className={styles.tz__label}>

      <span>{props.label}</span>

      <select value={tz} onChange={e => setTz(e.currentTarget.value)}>
        {options.map(option => (
          <option key={nanoid()} value={option.value}>{option.label}</option>
        ))}
      </select>

    </label>
  );
}
