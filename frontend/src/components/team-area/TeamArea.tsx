import clsx from 'clsx';
import styles from './TeamArea.module.scss';

import { ReactComponent as FilterIcon } from 'assets/icon-filter-members.svg';

export const TeamArea = (): JSX.Element => {
  return (
    <div className={clsx('team__element', styles.squad)}>
      <div className={styles.squad__header}>
        <div className={styles['squad__full-team']}>
          <input type="checkbox" name="full_team" id="full_team" value="all" />
          <label htmlFor="full_team">Все участники</label>
        </div>
        <div className={styles.squad__search}>
          <div className={styles['squad__input-wrapper']}>
            <input
              type="text"
              name="search__teammate"
              id="search__teammate"
              placeholder="Найти участника"
            />
          </div>
          <div className={styles.squad__filter}>
            <FilterIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
