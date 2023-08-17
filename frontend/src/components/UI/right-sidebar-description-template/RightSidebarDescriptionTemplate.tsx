import { useState, useEffect } from 'react';
import styles from './RightSidebarDescriptionTemplate.module.scss';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { InputName } from 'src/typings/constants';

type PropsType = {
  name: InputName;
  label: string;
  placeholder: string;
  register: (name: any, options?: RegisterOptions) => UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const RightSidebarDescriptionTemplate = ({
  name,
  label,
  placeholder,
  register,
  onChange,
  onBlur,
}: PropsType): JSX.Element => {
  const [rows, setRows] = useState(5);

  useEffect(() => {
    const calculateRows = () => {
      const reservedHeight = 370;
      const lineHeight = 24;
      const screenHeight = window.innerHeight;
      const rows = Math.floor((screenHeight - reservedHeight) / lineHeight);
      setRows(rows);
    };

    calculateRows();

    window.addEventListener('resize', calculateRows);

    return () => {
      window.removeEventListener('resize', calculateRows);
    };
  }, []);

  return (
    <label className={styles.description}>
      <span className={styles.description__label}>{label}</span>
      <textarea
        rows={rows}
        placeholder={placeholder}
        autoComplete={'off'}
        className={styles.description__text}
        {...register(name, { onChange, onBlur })}
      />
    </label>
  );
};
