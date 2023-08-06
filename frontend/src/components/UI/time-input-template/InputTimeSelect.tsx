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
  lastWorkStartChoice: string | undefined;
  lastWorkFinishChoice: string | undefined;
  handleChange: (data: RequestWorkTimeType) => void;
};

export const InputTimeSelect: React.FC<PropsType> = (props) => {
  const STEP_MINUTES = 30;
  const DAY_MINUTES = 1440;
  const [start, finish] = props.names;

  const [selectedTime, setSelectedTime] = React.useState<ComponentWorkTimeType>(
    {
      [start]: { value: -1, label: '' },
      [finish]: { value: -1, label: '' },
    },
  );

  // get time from props (from Redux)
  React.useEffect(() => {
    if (props.lastWorkStartChoice && props.lastWorkFinishChoice) {
      const [startHour, startMin] = props.lastWorkStartChoice.split(':');
      const [finishHour, finishMin] = props.lastWorkFinishChoice.split(':');

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
    for (let min = 0; min <= DAY_MINUTES; min += STEP_MINUTES) {
      const time: string = toHoursAndMinutes(min);
      result.push({ value: min, label: time });
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
    console.log(action.name);

    // simple selectedTime validation
    if (action.name === start) {
      if (choice.value >= selectedTime[finish].value) {
        setSelectedTime({ ...selectedTime, [action.name]: choice });
        return;
      }
    }
    if (action.name === finish) {
      if (selectedTime[start].value >= choice.value) {
        setSelectedTime({ ...selectedTime, [action.name]: choice });
        return;
      }
    }

    // if valid, send on a server by Redux
    const clientTime = {
      [start]: `${selectedTime[start].label}:00`,
      [finish]: `${selectedTime[finish].label}:00`,
      // update
      [action.name]: `${choice.label}:00`,
    };
    props.handleChange(clientTime);
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
