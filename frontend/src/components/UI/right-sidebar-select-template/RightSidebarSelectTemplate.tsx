import { useState } from 'react';
import styles from './RightSidebarSelectTemplate.module.scss';
import Select, { SingleValue, ActionMeta } from 'react-select';
import './RightSidebarSelectTemplate.scss'; // <-- Управление стилями компонента Select, модульно пока не получилось (https://react-select.com/styles#inner-components)

export type OptionType = {
  [key: string]: string;
};

type PropsType = {
  name: string;
  label: string;
  options: OptionType[];
  value?: OptionType | null;
  handleChange: (
    choice: SingleValue<OptionType>,
    name: string | undefined,
  ) => void;
};

export const RightSidebarSelectTemplate = ({
  name,
  label,
  options,
  value,
  handleChange,
}: PropsType): JSX.Element => {
  const [choice, setChoice] = useState(value);

  const handleSelection = (
    choice: SingleValue<OptionType>,
    action: ActionMeta<OptionType>,
  ) => {
    handleChange(choice, action.name);
    setChoice(choice);
  };

  return (
    <label className={styles.select}>
      <span className={styles.select__label}>{label}</span>

      <Select
        // styles={customStyles}
        unstyled={true}
        classNamePrefix={'right-sidebar-select'}
        options={options}
        value={choice}
        name={name}
        placeholder=""
        onChange={handleSelection}
      />
    </label>
  );
};
