import React from 'react';
import styles from './Sidebar.module.scss';
import { ReactComponent as SignPlus } from 'assets/sidebar-plus.svg';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';
import { useSelector } from 'src/services/hooks';
import { selectUserMe } from 'src/services/slices/authSlice';

export const Sidebar: React.FC = () => {
  const userMe = useSelector(selectUserMe);

  const projects = [
    { id: 1, name: 'Пример проекта' },
    { id: 2, name: 'ABC.Документы' },
    { id: 3, name: 'UV’s Таблицы' },
    { id: 4, name: 'Intel Дизайн' },
    { id: 5, name: 'Power—Точка' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <Account {...userMe} />
        <Projects projects={projects} />
      </div>
      <div className={styles['sidebar__createBtn-container']}>
        <button className={`${styles.sidebar__createBtn}`}>
          <SignPlus className={styles.sidebar__plus} />
          <span>Создать проект</span>
        </button>
      </div>
    </aside>
  );
};
