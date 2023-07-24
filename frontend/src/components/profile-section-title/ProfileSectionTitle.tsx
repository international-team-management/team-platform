import React from 'react';
import styles from './ProfileSectionTitle.module.scss';

type ProfileSectionProps = {
  subtitle: string,
  description: string,
}

export const ProfileSectionTitle:React.FC<ProfileSectionProps> = (props) => {

  return (
    <div className={styles["profile__section-wrapper"]}>
      <h3 className={styles["profile__section-subtitle"]}>{props.subtitle}</h3>
      <p className={styles["profile__section-description"]}>{props.description}</p>
    </div>
  )
}
