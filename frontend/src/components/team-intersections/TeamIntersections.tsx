import clsx from 'clsx';
import styles from './TeamIntersections.module.scss';
import { TeamIntersectionsComponent } from '../team-intersections-component/TeamIntersectionsComponent';

export const TeamIntersections = (): JSX.Element => {
  return (
    <div className={clsx('team__element', styles.intersections)}>
      <h3 className={styles.intersections__title}>Пересечение по времени</h3>
      <TeamIntersectionsComponent
        width={'372px'}
        background={'red'}
        total={9}
        time={'10:00-12:00'}
      />
    </div>
  );
};
