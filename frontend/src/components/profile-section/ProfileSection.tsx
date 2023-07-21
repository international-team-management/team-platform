import React from 'react';
import styles from './ProfileSection.module.scss';

type ProfileSectionProps = {
  subtitle: string,
  description: string,
}

export const ProfileSection:React.FC<ProfileSectionProps> = (props) => {

  return (
    <div className={styles.profilesection__wrapper}>
      <h3 className={styles.profilesection__subtitle}>{props.subtitle}</h3>
      <p className={styles.profilesection__description}>{props.description}</p>
    </div>
  )
}
