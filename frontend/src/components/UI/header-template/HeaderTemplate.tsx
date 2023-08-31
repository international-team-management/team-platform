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
import { useDispatch, useSelector } from 'src/services/hooks';
import {
  selectAuthIsLoading,
  selectAuthError,
  logout,
} from 'src/services/slices/authSlice';
import { NavLink } from 'react-router-dom';
import { selectCurrentProject } from 'src/services/slices/projectSlice';
import {
  HeaderState,
  VIEWS,
  selectHeaderState,
  selectHeaderView,
  setHeaderState,
  setHeaderView,
} from 'src/services/slices/headerSlice';
import { PopupTemplate } from '../popup/Popup';
import { closePopup, openPopup } from 'src/services/slices/popupSlice';
import { openSidebar } from 'src/services/slices/sidebarSlice';
import { useLocation } from 'react-router-dom';

const users = [
  { name: 'User 1', src: userAvatar },
  { name: 'User 2', src: addNewParticipant },
];

export const HeaderTemplate = (): JSX.Element => {
  const isAuthApiLoading = useSelector(selectAuthIsLoading);
  const isAuthApiError = useSelector(selectAuthError);
  const [profileInfo, setProfileInfo] = useState<string>('');
  const { isOpen } = useSelector((store) => store.popup);
  const dispatch = useDispatch();
  const location = useLocation();

  const headerState = useSelector(selectHeaderState);
  const headerView = useSelector(selectHeaderView);

  const togglePopap = () => {
    if (isOpen) {
      dispatch(closePopup());
    } else {
      dispatch(openPopup());
    }
  };

  const currentProject = useSelector(selectCurrentProject);

  const handlerLogout = () => {
    dispatch(logout());
  };

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
    dispatch(closePopup());
  };

  const popupButtonsProfile = [
    {
      title: 'Выйти из аккаунта',
      onClick: handlerLogout,
    },
    {
      title: 'Удалить аккаунт',
      onClick: () => console.log('Удалить аккаунт'),
    },
  ];

  const popupButtonsProgect = [
    {
      title: 'О проекте',
      onClick: handleOpenSidebar,
    },
    {
      title: 'Выйти из проекта',
      onClick: () => console.log('Выйти из проекта'),
    },
    {
      title: 'Удалить проект',
      onClick: () => console.log('Удалить проект'),
    },
  ];

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

  useEffect(() => {
    const currentPath = window.location.pathname;
    let currentState = HeaderState.KANBAN;
    let currentView = VIEWS.KANBAN;

    if (currentPath === '/profile') {
      currentState = HeaderState.PROFILE;
    } else if (currentPath.includes('/team')) {
      currentState = HeaderState.KANBAN;
      currentView = VIEWS.TEAM;
    }

    dispatch(setHeaderState(currentState));
    dispatch(setHeaderView(currentView));
  }, [location]);

  return (
    <section className={styles.header}>
      <h1 className={styles.header__title}>
        {headerState === HeaderState.KANBAN
          ? headerView === VIEWS.TEAM
            ? 'Команда проекта'
            : currentProject.name
          : 'Личный кабинет'}
      </h1>

      {headerState === HeaderState.PROFILE && (
        <p className={styles['header__changes-status']}>{profileInfo}</p>
      )}

      {headerState === HeaderState.KANBAN && (
        <div className={styles['header__project-menu']}>
          <div className={styles['header__project-buttons']}>
            <div className={styles['header__button-wrapper']}>
              <NavLink
                to={`/${currentProject.id}`}
                className={clsx(
                  styles['header__button-area'],
                  headerView === VIEWS.KANBAN &&
                    styles['header__button-area_active'],
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
                  headerView === VIEWS.LIST &&
                    styles['header__button-area_active'],
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
                headerView === VIEWS.TEAM &&
                  styles['header__button-area_active'],
              )}
              to={`/${currentProject.id}/team`}
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
          onClick={togglePopap}
        />
      </div>
      {isOpen && (
        <PopupTemplate
          buttons={
            headerState === HeaderState.PROFILE
              ? popupButtonsProfile
              : popupButtonsProgect
          }
        />
      )}
    </section>
  );
};
