import React from 'react';
import styles from './Sidebar.module.scss';
import {ReactComponent as SignPlus} from 'assets/sidebar-plus.svg';
import {Account} from '../account/Account';
import {Projects} from '../projects/Projects';

export function Sidebar(): React.ReactNode {

  // данные передадим сюда из Redux, ниже пока демка данных
  const user = {
    imgSrc: '',
    firstName: 'Джон',
    lastName: 'Доу',
    role: 'Чокнутый проффесоррррррр'
  }

  const projects = [
    {id: 1, name: 'Название проекта 1'},
    {id: 2, name: 'Название проекта длиною в жизнь'},
    {id: 3, name: 'Название проекта 3'},
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__border}>
        <Account {...user} />
        <Projects projects={projects}/>
      </div>
      <button className={`${styles.sidebar__createBtn} ${styles.sidebar__border}`}>
        <SignPlus className={styles.sidebar__plus}/>
        <span>Создать проект</span>
      </button>
    </aside>
  )
}
