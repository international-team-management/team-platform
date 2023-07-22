import styles from './ProfileMenu.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/seach.svg';
import { ReactComponent as NotificationIcon } from '../../assets/notification.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import clsx from 'clsx';

type ProfileProps = {
  isChange?: boolean | undefined,
}
export const ProfileMenu:React.FC<ProfileProps> = (props) => {
  return (
    <div className={styles.profile__menu}>
      <h1 className={styles.profile__title}>Личный кабинет</h1>
      <p className={clsx(
        styles.profile__changes,
        {
          [styles.profile__changes_true]: props.isChange === true,
          [styles.profile__changes_false]: props.isChange === false
        }
      )}>Изменения сохранены</p>
      <div className={styles.profile__buttons}>
        <SearchIcon className={styles.profile__button} />
        <NotificationIcon className={styles.profile__button} />
        <SettingsIcon className={styles.profile__button} />
      </div>
    </div>
  )
}
