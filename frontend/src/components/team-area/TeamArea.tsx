import clsx from 'clsx';
import styles from './TeamArea.module.scss';

import { ReactComponent as FilterIcon } from 'assets/icon-filter-members.svg';
import { Teammate } from '../team-teammate/Teammate';
import { TeamMock } from './team-mock';
import { useState } from 'react';

export const TeamArea = (): JSX.Element => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handlerAllChecked = () => {
    setIsAllChecked(!isAllChecked);
  };

  return (
    <div className={clsx('team__element', styles.squad)}>
      <div className={styles.squad__header}>
        <div className={styles['squad__full-team']}>
          <input
            type="checkbox"
            name="full_team"
            id="full_team"
            value="all"
            onClick={handlerAllChecked}
          />
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
      <div className={styles.squad__table}>
        <div className={styles['squad__table-header']}>
          <span>Участник</span>
          <span>Контакты</span>
          <span>График работы</span>
        </div>
        {TeamMock.map((item) => (
          <Teammate
            name={item.name}
            email={item.email}
            jobTitle={item.jobTitle}
            phone={item.phone}
            time={item.time}
            key={item.email}
            isAllChecked={isAllChecked}
          />
        ))}
      </div>
    </div>
  );
};
