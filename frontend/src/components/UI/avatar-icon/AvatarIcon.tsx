import { useSelector } from 'react-redux/es/hooks/useSelector';
import styles from './AvatarIcon.module.scss';
import { selectUserMe } from 'src/services/slices/authSlice';
import { getAvatarColor } from 'src/utils/colorAvatarRandomizer/getAvatarColor';
import clsx from 'clsx';

export const AvatarIcon = ({ isSmall = false }): JSX.Element => {
  const userMe = useSelector(selectUserMe);

  const abbrName =
    userMe?.first_name && [...userMe.first_name][0].toUpperCase();

  const { bg: avatarBG, txt: avatarTXT } = getAvatarColor();

  return userMe?.photo ? (
    <div
      className={clsx(styles.icon, isSmall && styles.icon_small)}
      style={{
        backgroundColor: avatarBG,
        color: avatarTXT,
        backgroundImage: `url(${__API_ENDPOINT_BASE__ + userMe.photo})`,
      }}
    ></div>
  ) : (
    <div
      className={clsx(styles.icon, isSmall && styles.icon_small)}
      style={{
        backgroundColor: avatarBG,
        color: avatarTXT,
      }}
    >
      {abbrName}
    </div>
  );
};
