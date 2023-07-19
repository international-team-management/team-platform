import React from 'react';
import styles from './TitleTemplate.module.scss';
import clsx from 'clsx';

type TitleProps = {
  text: string,
}

export const TitleTemplate:React.FC<TitleProps> = (props) => {
  return (
    <h2
      className={clsx(
        styles.title
      )}
    >
      {props.text}
    </h2>
  )
}

