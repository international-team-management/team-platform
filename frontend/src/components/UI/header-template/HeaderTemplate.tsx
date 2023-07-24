import React from 'react';
import styles from './Header.module.scss';
import notificationIcon from 'src/assets/header-icons/header-notification-icon.svg';
import searchIcon from 'src/assets/header-icons/header-search-icon.svg';
import settingsIcon from 'src/assets/header-icons/header-settings-icon.svg';
import kanbanIcon from 'src/assets/header-icons/header-kanban-icon.svg';
import listIcon from 'src/assets/header-icons/header-list-icon.svg';
import {UserAvatar} from 'src/components/UI/user-avatar-template/UserAvatarTemplate';
import userAvatar from 'src/assets/user-avatar.svg';

export enum HeaderState {
  CHANGES_SAVED = 'CHANGES_SAVED',
  KANBAN = 'KANBAN'
}

interface HeaderTemplateProps {
  state: HeaderState
}

const users = [
  {name: 'User 1', src: userAvatar},
  {name: 'User 2', src: userAvatar},
  {name: 'User 3', src: userAvatar},
  {name: 'User 4', src: userAvatar}
];

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({state}) => (
  <section className={styles.header}>
    <p className={styles.header__title}>Личный кабинет</p>

    {state === HeaderState.CHANGES_SAVED &&
        <p className={styles['header__changes-status']}>Изменения были сохранены</p>
    }

    <div className={styles['header__project-menu']}>
      {state === HeaderState.KANBAN &&
        (<div className={styles['header__project-buttons']}>
            <div className={styles['header__buttons']}>
              <div className={styles['header__button-area']}>
                <img className={styles['header__switch-icon']} src={kanbanIcon} alt={`Кнопка ${kanbanIcon}`}/>
                <button
                  className={`${styles['header__switch-button']} ${styles['header__switch-button_active']}`}>Канбан
                </button>
              </div>
              <div className={styles['header__button-divider']}></div>
              <div className={styles['header__button-area']}>
                <img className={styles['header__switch-icon']} src={listIcon} alt={`Кнопка ${listIcon}`}/>
                <button className={styles['header__switch-button']}>Список</button>
              </div>
            </div>
            <UserAvatar users={users}/>
            <div className={styles['header__participants']}>
              <div className={styles['header__participants-count']}/>
              <span className={styles['header__participants-extra']}>+5</span>
            </div>
          </div>
        )}

      <div className={styles.header__icons}>
        <img className={styles['header__icon']} src={searchIcon} alt={`Кнопка ${searchIcon}`}/>
        <img className={styles['header__icon']} src={notificationIcon} alt={`Кнопка ${notificationIcon}`}/>
        <img className={styles['header__icon']} src={settingsIcon} alt={`Кнопка ${settingsIcon}`}/>
      </div>
    </div>
  </section>
);
