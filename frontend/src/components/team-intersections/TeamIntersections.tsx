import clsx from 'clsx';
import styles from './TeamIntersections.module.scss';

export const TeamIntersections = (): JSX.Element => {
  return (
    <div className={clsx('team__element', styles.intersections)}>
      Team Intersections
    </div>
  );
};
