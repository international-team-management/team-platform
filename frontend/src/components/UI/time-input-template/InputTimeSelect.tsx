import React from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import styles from './InputTimeSelect.module.scss';
import './SelectTComponent.scss'; // <-- Управление стилями компонента Select, модульно пока не получилось (https://react-select.com/styles#inner-components)

export type RequestWorkTimeType = {
  [key: string]: string;
};

type OptionType = {
  value: number;
  label: string;
};

type ComponentWorkTimeType = {
  [key: string]: OptionType;
};

type PropsType = {
  names: [string, string];
  label: string;
  workStart: string | undefined;
  workFinish: string | undefined;
  handleChange: (data: RequestWorkTimeType) => void;
};

export const InputTimeSelect: React.FC<PropsType> = (props) => {
  const STEP_MINUTES = 30;
  const DAY_MINUTES = 1440;
  const [start, finish] = props.names;

  const [selectedTime, setSelectedTime] = React.useState<ComponentWorkTimeType>(
    {
      [start]: { value: 0, label: '' },
      [finish]: { value: 0, label: '' },
    },
  );

  React.useEffect(() => {
    // get time from props (from Redux)
    if (props.workStart && props.workFinish) {
      const [startHour, startMin] = props.workStart.split(':');
      const [finishHour, finishMin] = props.workFinish.split(':');

      const serverOption = {
        [start]: {
          value: parseInt(startHour, 10) * 60 + parseInt(startMin, 10),
          label: `${startHour}:${startMin}`,
        },
        [finish]: {
          value: parseInt(finishHour, 10) * 60 + parseInt(finishMin, 10),
          label: `${finishHour}:${finishMin}`,
        },
      };
      console.log(serverOption, 'server');
      setSelectedTime(serverOption);
    }
  }, [props, start, finish]);

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
    for (let min = 0; min <= DAY_MINUTES; ) {
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

    // simple selectedTime validation
    // if (Object.values(selectedTime).every((obj) => obj.value !== 0)) return;
    // if (selectedTime[start].value >= selectedTime[finish].value) return;

    console.log(action.name);
    const componentTime = {
      [start]: `${selectedTime[start].label}:00`,
      [finish]: `${selectedTime[finish].label}:00`,
    };
    const clientTime = {
      ...componentTime,
      [action.name]: `${choice.label}:00`,
    };
    props.handleChange(clientTime); // send to Redux
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
          value={selectedTime[start]}
        />

        <Select
          unstyled={true}
          classNamePrefix={'t-select'}
          options={options}
          placeholder={''}
          name={finish}
          onChange={handleSelection}
          value={selectedTime[finish]}
        />
      </div>
    </div>
  );
};
