import React from 'react';
import styles from './Account.module.scss';
import type { UserType } from 'src/services/api/types';
import { Link } from 'react-router-dom';
import { AvatarIcon } from '../UI/avatar-icon/AvatarIcon';
import { useDispatch } from 'src/services/hooks';
import { closePopup } from 'src/services/slices/popupSlice';

export const Account = (props: UserType): JSX.Element => {
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    dispatch(closePopup());
  });

  return (
    <figure>
      <Link to={'/profile'} className={styles.account}>
        <AvatarIcon isSmall={true} />
        <figcaption className={styles.account__caption}>
          <p
            className={styles.account__user}
          >{`${props.first_name} ${props.last_name}`}</p>
          <p className={styles.account__role}>{props.role}</p>
        </figcaption>
      </Link>
    </figure>
  );
};
