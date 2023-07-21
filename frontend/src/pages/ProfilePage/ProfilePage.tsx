import React from "react";
import styles from './ProfilePage.module.scss';
import { Sidebar } from "src/components/sidebar/Sidebar";
import { ProfileForm } from "src/components/profile-form/ProfileForm";
export function ProfilePage(): React.ReactNode {

  return (
    <div className={styles.container}>
      <Sidebar />
      <section className={styles.container__wrapper}>
        <ProfileForm />
      </section>
    </div>
  )
}
