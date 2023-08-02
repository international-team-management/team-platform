import React from 'react';
import styles from './ProfilePage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { ProfileForm } from 'src/components/profile-form/ProfileForm';

export const ProfilePage: React.FC = () => {
  const state = HeaderState.CHANGES_SAVED;

  return (
    <section className={styles.profile}>
      <Sidebar />
      <div className={styles['profile__main-content']}>
        <HeaderTemplate state={state} />
        <ProfileForm />
      </div>
    </section>
  );
};
