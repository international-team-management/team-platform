import React from 'react';
import styles from './KanbanColumn.module.scss';
import { ReactComponent as TimerKanban } from 'assets/timer.svg';
import photo from '../../assets/user-avatar.svg';

type BoardTask = {
  id: number;
  subtitle: string;
  expiredDate: string;
  img: any;
};

type BoardItem = {
  id: number;
  title: string;
  tasks: BoardTask[];
};

const mockBoardItems: BoardItem[] = [
  {
    id: 1,
    title: 'Backlog',
    tasks: [
      {
        id: 1,
        subtitle: 'Поиск инвесторов на “Форум Развития 2023”',
        expiredDate: '23 июля',
        img: '',
      },
      {
        id: 2,
        subtitle:
          'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
        expiredDate: '28 июля',
        img: '',
      },
      {
        id: 3,
        subtitle:
          'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
        expiredDate: '4 августа',
        img: '',
      },
    ],
  },
  {
    id: 2,
    title: 'To Do',
    tasks: [
      {
        id: 1,
        subtitle:
          'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
        expiredDate: '28 июля',
        img: photo,
      },
    ],
  },
  {
    id: 3,
    title: 'In Progress',
    tasks: [
      {
        id: 1,
        subtitle:
          'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
        expiredDate: '14 июня',
        img: photo,
      },
    ],
  },
  {
    id: 4,
    title: 'In Review',
    tasks: [
      {
        id: 1,
        subtitle: 'Поиск инвесторов на “Форум Развития 2023”',
        expiredDate: '4 июня',
        img: photo,
      },
    ],
  },
  {
    id: 5,
    title: 'Done',
    tasks: [
      {
        id: 1,
        subtitle:
          'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
        expiredDate: '3 июля',
        img: '',
      },
    ],
  },
];

export const KanbanColumn = () => {
  const [boards, setBoards] = React.useState(mockBoardItems);
  const [active, setActive] = React.useState(false);

  // const dragOverHandler = (e, task, board) => {
  //   e.preventDefault();
  //   if (e.target.className === styles.column__task) {

  //   }
  // }

  // const dragLeaveHandler = (e) => {

  // }
  // const dragStartHandler = (e) => {
  //   e.target.className =  styles.column__task_drag

  // }

  // const dragEndHandler = (e) => {
  //   e.target.className =  styles.column__task
  // }

  // const dropHandler = (e, task, board) => {
  //   e.preventDefault();
  // }
  return (
    <>
      {boards.map((board) => (
        <div className={styles.column__wrapper} key={board.id}>
          <div className={styles.column__info}>
            <div className={styles.column__text}>
              <h3 className={styles.column__title}>{board.title}</h3>
              <span className={styles.column__quantity}>
                {board.tasks.length}
              </span>
            </div>
            <button className={styles.column__button} />
          </div>
          {board.tasks.map((task) => (
            <div
              className={styles.column__task}
              key={task.id}
              draggable={true}
              // onDragOver={e => dragOverHandler(e, task, board)}
              // onDragLeave={e => dragLeaveHandler(e)}
              // onDragStart={e => dragStartHandler(e)}
              // onDragEnd={e => dragEndHandler(e)}
              // onDrop={e => dropHandler(e, task, board)}
            >
              <p className={styles.column__task_text}>{task.subtitle}</p>
              <button className={styles.column__task_button} />
              <div className={styles.column__task_wrapper}>
                <TimerKanban className={styles.column__task_icon} />
                <p className={styles.column__task_time}>{task.expiredDate}</p>
              </div>
              {task.img !== '' ? (
                <img
                  className={styles.column__task_img}
                  title="Изоображение"
                  src={task.img}
                />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
