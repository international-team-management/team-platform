import React, { useState } from "react";
import Select from 'react-select';
import styles from "./InputTimeSelect.module.scss";
import './SelectTComponent.scss';  // <-- Управление стилями компонента Select, модульно пока не получилось (https://react-select.com/styles#inner-components)


type InputTimePropsType = {
  label: string
}

export const InputTimeSelect:React.FC<InputTimePropsType> = (props) => {
    const toHoursAndMinutes = (min: number): string => {
        const hours: number = Math.floor(min / 60);
        const minutes: number = min % 60;
        const formatHours = `${hours < 10 ? `0${hours}` : `${hours}`}`;
        const formatMinutes = `${minutes === 0 ? '00' : `${minutes}`}`;
      
        return hours ? `${formatHours}:${minutes === 0 ? '00' : `${minutes}`}` : `00:${formatMinutes}`;
      };

      type TGetOptions = { value: string, label: string }
      
      const getOptions = (): TGetOptions[] => {
          const result = [];
          
          for(let min = 0; min < 1440;) {
            const time: string = toHoursAndMinutes(min);
            result.push({value: time, label: time});
            min += 10;
          }
      
          return result;
      }

  const options = getOptions();

//   const [tz, setTz] = useState(
//     parseTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
//   );

  return (

    <div className={styles.t}>

      <span>{props.label}</span>
      <div className={styles.t__container}>
        <label>
          <Select
            unstyled={true}
            classNamePrefix={'t-select'}
            options={options}
            placeholder={''}
          />
        </label>
        <label>
          <Select
            unstyled={true}
            classNamePrefix={'t-select'}
            options={options}
            placeholder={''}
          />
        </label>
      </div>
    </div>
  );
}
