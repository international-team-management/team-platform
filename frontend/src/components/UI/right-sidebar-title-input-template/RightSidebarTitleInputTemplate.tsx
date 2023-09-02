import styles from './RightSidebarTitleInputTemplate.module.scss';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { InputName } from 'src/typings/constants';

type PropsType = {
  name: InputName;
  register: (name: any, options?: RegisterOptions) => UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const RightSidebarTitleInputTemplate = ({
  name,
  register,
  onChange,
  onBlur,
}: PropsType): JSX.Element => {
  return (
    <textarea
      rows={2}
      autoComplete={'off'}
      className={styles.title}
      {...register(name, { onChange, onBlur })}
    />
  );
};
