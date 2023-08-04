import React from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import styles from './InputTimeSelect.module.scss';
import './SelectTComponent.scss'; // <-- Управление стилями компонента Select, модульно пока не получилось (https://react-select.com/styles#inner-components)

type OptionType = {
  value: number;
  label: string;
};

export type WorkTimeType = {
  [key: string]: null | number;
};

type InputTimePropsType = {
  names: [string, string];
  label: string;
  handleChange: (data: WorkTimeType) => void;
};

export const InputTimeSelect: React.FC<InputTimePropsType> = (props) => {
  const STEP_MINUTES = 10;
  const DAY_MINUTES = 1440;
  const [start, finish] = props.names;

  const [workTime, setWorkTime] = React.useState<WorkTimeType>({
    [start]: null,
    [finish]: null,
  });

  React.useEffect(() => {
    if (Object.values(workTime).every((value) => value !== null)) return;
    if (workTime[start] >= workTime[finish]) return; // TODO: how to fix TS issue here
    props.handleChange(workTime);
  }, [workTime, props, start, finish]);

  const toHoursAndMinutes = (min: number): string => {
    const hours: number = Math.floor(min / 60);
    const minutes: number = min % 60;

    const formatHours = `${hours < 10 ? `0${hours}` : `${hours}`}`;
    const formatMinutes = `${minutes === 0 ? '00' : `${minutes}`}`;

    return hours
      ? `${formatHours}:${minutes === 0 ? '00' : `${minutes}`}`
      : `00:${formatMinutes}`;
  };

  const getOptions = (): OptionType[] => {
    const result = [];
    for (let min = 0; min < DAY_MINUTES; ) {
      const time: string = toHoursAndMinutes(min);
      result.push({ value: min, label: time });
      min += STEP_MINUTES;
    }
    return result;
  };

  const options = getOptions();

  const handleSelection = (
    choice: SingleValue<OptionType>,
    action: ActionMeta<OptionType>,
  ) => {
    if (choice === null) return;
    if (action.name !== start && action.name !== finish) return;
    setWorkTime({ ...workTime, [action.name]: choice?.value });
  };

  return (
    <div className={styles.t}>
      <span>{props.label}</span>
      <div className={styles.t__container}>
        <Select
          unstyled={true}
          classNamePrefix={'t-select'}
          options={options}
          placeholder={''}
          name={start}
          onChange={handleSelection}
        />

        <Select
          unstyled={true}
          classNamePrefix={'t-select'}
          options={options}
          placeholder={''}
          name={finish}
          onChange={handleSelection}
        />
      </div>
    </div>
  );
};
