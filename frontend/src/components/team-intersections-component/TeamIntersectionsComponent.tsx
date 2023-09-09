import clsx from 'clsx';
import styles from './TeamIntersectionsComponent.module.scss';
import { useState } from 'react';

type ComponentProps = {
  width: string;
  background: string;
  total: number;
  time: string;
};

export const TeamIntersectionsComponent = (
  props: ComponentProps,
): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={clsx(
        styles.intersections,
        isActive && styles.intersections_active,
      )}
      style={{
        width: `${props.width}`,
      }}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={styles.intersections__info}>
        <div className={styles.intersections__total}>
          {props.total + ' участников'}
        </div>
        <div className={styles.intersections__time}>{props.time}</div>
      </div>
      <div
        className={styles.intersections__bar}
        style={{
          backgroundColor: `${props.background}`,
          borderRadius: 16,
          height: 16,
        }}
      ></div>
    </div>
  );
};
