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

export enum HeaderState {
  PROFILE = 'PROFILE',
  KANBAN = 'KANBAN',
}

const VIEWS = {
  KANBAN: 'button-kanban',
  LIST: 'button-list',
};

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
}) => {
  const isAuthApiLoading = useSelector(selectAuthIsLoading);
  const isAuthApiError = useSelector(selectAuthError);
  const [profileInfo, setProfileInfo] = useState<string>('');

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

  const [activeView, setActiveView] = useState(VIEWS.KANBAN);

  const handlerChangeView = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const current = e.currentTarget as HTMLElement;
    setActiveView(current.id);
  };

  return (
    <section className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>

      {state === HeaderState.PROFILE && (
        <p className={styles['header__changes-status']}>{profileInfo}</p>
      )}

      {state === HeaderState.KANBAN && (
        <div className={styles['header__project-menu']}>
          <div className={styles['header__project-buttons']}>
            <div className={styles['header__button-wrapper']}>
              <button
                className={clsx(
                  styles['header__button-area'],
                  activeView === VIEWS.KANBAN &&
                    styles['header__button-area_active'],
                )}
                id={VIEWS.KANBAN}
                onClick={(e) => handlerChangeView(e)}
              >
                <KanbanIcon className={styles['header__switch-icon']} />
                <div
                  className={`${styles['header__switch-button']} ${styles['header__switch-button_active']}`}
                >
                  Канбан
                </div>
              </button>
            </div>
            <div className={styles['header__button-wrapper']}>
              <button
                className={clsx(
                  styles['header__button-area'],
                  activeView === VIEWS.LIST &&
                    styles['header__button-area_active'],
                )}
                id={VIEWS.LIST}
                onClick={(e) => handlerChangeView(e)}
              >
                <ListIcon className={styles['header__switch-icon']} />
                <div className={styles['header__switch-button']}>Список</div>
              </button>
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
};
