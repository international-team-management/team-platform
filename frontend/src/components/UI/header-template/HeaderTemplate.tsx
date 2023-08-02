import React from 'react';
import styles from './Header.module.scss';
import notificationIcon from 'src/assets/header-icons/header-notification-icon.svg';
import searchIcon from 'src/assets/header-icons/header-search-icon.svg';
import settingsIcon from 'src/assets/header-icons/header-settings-icon.svg';
import kanbanIcon from 'src/assets/header-icons/header-kanban-icon.svg';
import listIcon from 'src/assets/header-icons/header-list-icon.svg';
import { UserAvatar } from 'src/components/UI/user-avatar-template/UserAvatarTemplate';
import userAvatar from 'src/assets/user-avatar.svg';
import addNewParticipant from 'src/assets/add-new-participant.svg';

export enum HeaderState {
  CHANGES_SAVED = 'CHANGES_SAVED',
  KANBAN = 'KANBAN',
}

interface HeaderTemplateProps {
  state: HeaderState;
  title: string;
}

const users = [
  { name: 'User 1', src: userAvatar },
  { name: 'User 2', src: addNewParticipant },
];

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({
  state,
  title,
}) => (
  <section className={styles.header}>
    <h1 className={styles.header__title}>{title}</h1>

    {state === HeaderState.CHANGES_SAVED && (
      <p className={styles['header__changes-status']}>
        Изменения были сохранены
      </p>
    )}

    {state === HeaderState.KANBAN && (
      <div className={styles['header__project-menu']}>
        <div className={styles['header__project-buttons']}>
          <div className={styles['header__button-area']}>
            <img
              className={styles['header__switch-icon']}
              src={kanbanIcon}
              alt="Кнопка Канбан"
            />
            <button
              className={`${styles['header__switch-button']} ${styles['header__switch-button_active']}`}
            >
              Канбан
            </button>
          </div>
          <div className={styles['header__button-area']}>
            <img
              className={styles['header__switch-icon']}
              src={listIcon}
              alt="Кнопка Список"
            />
            <button className={styles['header__switch-button']}>Список</button>
          </div>
        </div>
        <UserAvatar users={users} />
      </div>
    )}

    <div className={styles.header__icons}>
      <img
        className={styles['header__icon']}
        src={searchIcon}
        alt={`Кнопка ${searchIcon}`}
      />
      <img
        className={styles['header__icon']}
        src={notificationIcon}
        alt={`Кнопка ${notificationIcon}`}
      />
      <img
        className={styles['header__icon']}
        src={settingsIcon}
        alt={`Кнопка ${settingsIcon}`}
      />
    </div>
  </section>
);
