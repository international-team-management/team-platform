import React from 'react';
import styles from './ProfileSectionTitle.module.scss';

type ProfileSectionProps = {
  subtitle: string,
  description: string,
}

export const ProfileSectionTitle:React.FC<ProfileSectionProps> = (props) => {

  return (
    <div className={styles['profile__info-container']}>
      <h3 className={styles.profile__subtitle}>{props.subtitle}</h3>
      <p className={styles.profile__description}>{props.description}</p>
    </div>
  )
}
