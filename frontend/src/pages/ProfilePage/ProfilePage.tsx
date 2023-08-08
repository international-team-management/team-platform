import React from 'react';
import styles from './ProfilePage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { ProfileForm } from 'src/components/profile-form/ProfileForm';

export const ProfilePage: React.FC = () => {
  return (
    <section className={styles.profile}>
      <Sidebar
        createProgect={() => {
          return;
        }}
      />
      <div className={styles['profile__main-content']}>
        <HeaderTemplate state={HeaderState.PROFILE} title="Личный кабинет" />
        <ProfileForm />
      </div>
    </section>
  );
};
