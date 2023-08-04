import React from 'react';
import styles from './Sidebar.module.scss';
import { ReactComponent as SignPlus } from 'assets/sidebar-plus.svg';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';
import framedAvatar from 'assets/framed-avatar.svg';

export const Sidebar: React.FC = () => {
  // данные передадим сюда из Redux, ниже пока демка данных
  const user = {
    photo: framedAvatar,
    first_name: 'Дмитрий',
    last_name: 'Петров',
    role: 'UX/UI дизайнер',
  };

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
        <Account
          id={0}
          username={''}
          email={''}
          created_at={''}
          update_at={''}
          is_active={false}
          telephone_number={0}
          {...user}
        />
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
