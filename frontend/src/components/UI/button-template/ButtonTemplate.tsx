import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
};

export const ButtonTemplate: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={clsx(
        styles.button,
        props.isDisabled && styles.button_disabled,
      )}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
