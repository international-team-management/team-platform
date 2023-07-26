import React from "react";
import styles from './Header.module.scss';
import notificationIcon from 'src/assets/header-icons/header-notification-icon.svg';
import searchIcon from 'src/assets/header-icons/header-search-icon.svg';
import settingsIcon from 'src/assets/header-icons/header-settings-icon.svg';
import kanbanIcon from 'src/assets/header-icons/header-kanban-icon.svg';
import listIcon from 'src/assets/header-icons/header-list-icon.svg';

enum HeaderState {
  CHANGES_SAVED = "CHANGES_SAVED",
  KANBAN = "KANBAN"
}

interface HeaderTemplateProps {
  state: HeaderState
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({state}) => (
  <section className={styles.header}>
    <p className={styles.header__title}>Личный кабинет</p>

    {state === HeaderState.CHANGES_SAVED &&
        <p className={styles["header__changes-status"]}>Изменения были сохранены</p>
    }

    {state === HeaderState.KANBAN &&
      (<div className={styles["header__switch-buttons"]}>
        <div>
          <img className={styles["header__switch-icon"]} src={kanbanIcon} alt={`Кнопка ${kanbanIcon}`}/>
          <button className={styles["header__switch-button"]}>Канбан</button>
        </div>
        <div className={styles["header__button-divider"]}></div>
        <div>
          <img className={styles["header__switch-icon"]} src={listIcon} alt={`Кнопка ${listIcon}`}/>
          <button className={styles["header__switch-button"]}>Список</button>
        </div>
        <div>

        </div>
      </div>)}

    <div className={styles.header__icons}>
      <img className={styles["header__icon"]} src={searchIcon} alt={`Кнопка ${searchIcon}`}/>
      <img className={styles["header__icon"]} src={notificationIcon} alt={`Кнопка ${notificationIcon}`}/>
      <img className={styles["header__icon"]} src={settingsIcon} alt={`Кнопка ${settingsIcon}`}/>
    </div>
  </section>
);
