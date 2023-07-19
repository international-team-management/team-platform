import React from 'react';
import styles from './Sidebar.module.scss';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';

export function Sidebar(): React.ReactNode {
  const User = {
    imgSrc: '',
    name: 'Джон',
    surname: 'Доу',
    role: 'Чокнутый проффесоррррррр'
  }

  return (
    <aside className={styles.sidebar}>
      <Account {...User}/>
      <Projects />
      {/* <CreateButton /> */}
    </aside>
  )
}
