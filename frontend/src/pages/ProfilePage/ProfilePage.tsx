import React from "react";
import styles from './ProfilePage.module.scss';
import { Sidebar } from "src/components/sidebar/Sidebar";
import {HeaderTemplate} from "components/UI/header-template/HeaderTemplate";


export function ProfilePage(): React.ReactNode {
  return (
    <div className={styles.container}>
      <Sidebar />
      <HeaderTemplate />
    </div>
  )
}
