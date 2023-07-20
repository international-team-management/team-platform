import React from 'react';
import styles from './Sidebar.module.scss';
import { ReactComponent as SignPlus } from 'assets/sidebar__plus.svg';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';
import { useSelector } from 'src/services/hooks';
import { selectUserMe } from 'src/services/slices/userMeSlice';

export function Sidebar(): React.ReactNode {

  const userMe = useSelector(selectUserMe)
  // данные передадим сюда из Redux, ниже пока демка данных
  // const user = {
  //   imgSrc: '',
  //   firstName: 'Джон',
  //   lastName: 'Доу',
  //   role: 'Чокнутый проффесоррррррр'
  // }

  const projects = [
    { id: 1, name: 'Название проекта 1' },
    { id: 2, name: 'Название проекта длиною в жизнь' },
    { id: 3, name: 'Название проекта 3' },
  ]

  return (
    <aside className={styles.sidebar}>
      <Account {...userMe} />
      <Projects projects={projects} />

      <button className={styles.sidebar__createBtn}>
        <SignPlus className={styles.sidebar__plus} />
        <span>Создать проект</span>
      </button>
    </aside>
  )
}
