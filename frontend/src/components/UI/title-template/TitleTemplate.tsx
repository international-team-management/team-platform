import React from 'react';
import styles from './TitleTemplate.module.scss';
import clsx from 'clsx';

type TitleProps = {
  text: string;
  descrption: string;
};

export const TitleTemplate: React.FC<TitleProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={clsx(styles.title)}>{props.text}</h2>
      <p className={clsx(styles.description)}>{props.descrption}</p>
    </div>
  );
};
