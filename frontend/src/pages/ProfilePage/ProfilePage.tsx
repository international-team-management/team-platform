import React from 'react';
import styles from './ProfilePage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { ProfileForm } from 'src/components/profile-form/ProfileForm';
import { useCreateProject } from 'src/utils/createProject';
// import { useParams } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const [, , createProject] = useCreateProject();

  return (
    <section className={styles.profile}>
      <Sidebar createProject={createProject} />
      <div className={styles['profile__main-content']}>
        <HeaderTemplate state={HeaderState.PROFILE} title="Личный кабинет" />
        <ProfileForm />
      </div>
    </section>
  );
};
