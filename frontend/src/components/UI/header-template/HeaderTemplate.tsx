import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import notificationIcon from 'src/assets/header-icons/header-notification-icon.svg';
import searchIcon from 'src/assets/header-icons/header-search-icon.svg';
import settingsIcon from 'src/assets/header-icons/header-settings-icon.svg';
import { ReactComponent as KanbanIcon } from 'src/assets/header-icons/header-kanban-icon.svg';
import { ReactComponent as ListIcon } from 'src/assets/header-icons/header-list-icon.svg';
import { UserAvatar } from 'src/components/UI/user-avatar-template/UserAvatarTemplate';
import userAvatar from 'src/assets/user-avatar.svg';
import addNewParticipant from 'src/assets/add-new-participant.svg';
import clsx from 'clsx';
import { useSelector } from 'src/services/hooks';
import {
  selectAuthIsLoading,
  selectAuthError,
} from 'src/services/slices/authSlice';
import { NavLink, useParams } from 'react-router-dom';
import { selectCurrentProject } from 'src/services/slices/projectSlice';

export enum HeaderState {
  PROFILE = 'PROFILE',
  KANBAN = 'KANBAN',
}

export enum VIEWS {
  KANBAN = 'button-kanban',
  LIST = 'button-list',
  TEAM = 'button-team',
}

interface HeaderTemplateProps {
  state: HeaderState;
  view: VIEWS;
}

const users = [
  { name: 'User 1', src: userAvatar },
  { name: 'User 2', src: addNewParticipant },
];

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({
  state,
  view,
}) => {
  const isAuthApiLoading = useSelector(selectAuthIsLoading);
  const isAuthApiError = useSelector(selectAuthError);
  const [profileInfo, setProfileInfo] = useState<string>('');
  const params = useParams();

  const projectTitle = useSelector(selectCurrentProject);

  useEffect(() => {
    const showMessage = (message: string, duration: number): Promise<void> => {
      setProfileInfo(message);
      return new Promise<void>((resolve) => setTimeout(resolve, duration));
    };

    if (isAuthApiLoading) {
      showMessage('Сохраняем...', 700)
        .then(() => showMessage('Изменения были сохранены', 1400))
        .then(() => showMessage('', 0));
      if (isAuthApiError) {
        showMessage(isAuthApiError.toString(), 5000).then(() =>
          showMessage('', 0),
        );
      }
    }
  }, [isAuthApiLoading, isAuthApiError]);

  return (
    <section className={styles.header}>
      <h1 className={styles.header__title}>{projectTitle.name}</h1>

      {state === HeaderState.PROFILE && (
        <p className={styles['header__changes-status']}>{profileInfo}</p>
      )}

      {state === HeaderState.KANBAN && (
        <div className={styles['header__project-menu']}>
          <div className={styles['header__project-buttons']}>
            <div className={styles['header__button-wrapper']}>
              <NavLink
                to={`/${params.id}`}
                className={clsx(
                  styles['header__button-area'],
                  view === VIEWS.KANBAN && styles['header__button-area_active'],
                )}
                id={VIEWS.KANBAN}
              >
                <KanbanIcon className={styles['header__switch-icon']} />
                <div
                  className={`${styles['header__switch-button']} ${styles['header__switch-button_active']}`}
                >
                  Канбан
                </div>
              </NavLink>
            </div>
            <div className={styles['header__button-wrapper']}>
              <button
                className={clsx(
                  styles['header__button-area'],
                  view === VIEWS.LIST && styles['header__button-area_active'],
                )}
                id={VIEWS.LIST}
              >
                <ListIcon className={styles['header__switch-icon']} />
                <div className={styles['header__switch-button']}>Список</div>
              </button>
            </div>
          </div>
          <div className={styles['header__button-wrapper']}>
            <NavLink
              className={clsx(
                styles['header__button-area'],
                view === VIEWS.TEAM && styles['header__button-area_active'],
              )}
              to={`/${params.id}/team`}
              id={VIEWS.TEAM}
            >
              <UserAvatar users={users} />
            </NavLink>
          </div>
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
};
