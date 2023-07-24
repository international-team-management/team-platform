import React from 'react';
import styles from './Sidebar.module.scss';
import {ReactComponent as SignPlus} from 'assets/sidebar-plus.svg';
import {Account} from '../account/Account';
import {Projects} from '../projects/Projects';

export function Sidebar(): React.ReactNode {

  // данные передадим сюда из Redux, ниже пока демка данных
  const user = {
    imgSrc: '',
    firstName: 'Дмитрий',
    lastName: 'Петров',
    role: 'UX/UI дизайнер'
  }

  const projects = [
    {id: 1, name: 'ABC.Документы'},
    {id: 2, name: 'UV’s Таблицы'},
    {id: 3, name: 'Intel Дизайн'},
    {id: 4, name: 'Power—Точка'},
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <Account {...user} />
        <Projects projects={projects}/>
      </div>
      <div className={styles['sidebar__createBtn-container']}>
        <button className={`${styles.sidebar__createBtn}`}>
          <SignPlus className={styles.sidebar__plus}/>
          <span>Создать проект</span>
        </button>
      </div>
    </aside>
  )
}
