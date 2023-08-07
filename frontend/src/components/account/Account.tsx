import React from 'react';
import styles from './Account.module.scss';
import { ReactComponent as FramedAvatar } from 'assets/framed-avatar.svg';
import type { UserType } from 'src/services/api/types';
import { Link } from 'react-router-dom';

export const Account: React.FC<UserType> = (props) => {
  return (
    <figure className={styles.account}>
      <Link to={'/profile'}>
        {props.photo ? (
          <img
            className={styles.account__image}
            src={props.photo}
            alt={`${props.first_name} ${props.last_name}`}
          />
        ) : (
          <FramedAvatar className={styles.account__image} />
        )}
      </Link>
      <figcaption className={styles.account__caption}>
        <p
          className={styles.account__user}
        >{`${props.first_name} ${props.last_name}`}</p>
        <p className={styles.account__role}>{props.role}</p>
      </figcaption>
    </figure>
  );
};
