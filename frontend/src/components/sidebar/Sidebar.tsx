import React from 'react';
import styles from './Sidebar.module.scss';
import { ReactComponent as SignPlus } from 'assets/sidebar-plus.svg';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';
import { useSelector } from 'src/services/hooks';
import { selectUserMe } from 'src/services/slices/authSlice';
import { projects } from 'src/utils/constants temporary/constant_temp';

type SidebarProps = {
  createProject: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  createProject,
}: SidebarProps) => {
  const userMe = useSelector(selectUserMe);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <Account {...userMe} />
        <Projects projects={projects} />
      </div>
      <div className={styles['sidebar__createBtn-container']}>
        <button
          className={`${styles.sidebar__createBtn}`}
          onClick={() => createProject()}
        >
          <SignPlus className={styles.sidebar__plus} />
          <span>Создать проект</span>
        </button>
      </div>
    </aside>
  );
};
