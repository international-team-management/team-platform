import React from 'react';
import styles from './KanbanColumn.module.scss';
import { ReactComponent as TimerKanban } from 'assets/timer.svg';
import photo from '../../assets/user-avatar.svg';
import clsx from 'clsx';

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
        id: 11,
        subtitle: 'Поиск инвесторов на “Форум Развития 2023”',
        expiredDate: '23 июля',
        img: '',
      },
      {
        id: 12,
        subtitle:
          'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
        expiredDate: '28 июля',
        img: '',
      },
      {
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
        id: 17,
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
  const [currentBoard, setCurrentBoard] = React.useState<BoardItem>();
  const [currentTask, setCurrentTask] = React.useState<BoardTask>();
  const [hover, setHover] = React.useState<number | null>(null);

  const dragOverHandlerTask = (
    e: React.DragEvent<HTMLElement>,
    task: BoardTask,
  ) => {
    e.preventDefault();
    setHover(task.id);
  };

  const dragOverHandlerBoard = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = () => {
    setHover(null);
  };

  const dragStartHandler = (task: BoardTask, board: BoardItem) => {
    setCurrentTask(task);
    setCurrentBoard(board);
  };

  const dragEndHandler = () => {
    setHover(null);
    setCurrentTask(undefined);
  };

  const componentRedraw = () => {
    setHover(null);
    setCurrentTask(undefined);
  };

  const dropCardHendler = (
    _e: React.DragEvent<HTMLElement>,
    board: BoardItem,
  ) => {
    if (currentTask && currentBoard) {
      board.tasks.push(currentTask);
      const currentIndex = currentBoard.tasks.indexOf(currentTask);
      currentBoard.tasks.splice(currentIndex, 1);

      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        }),
      );
      componentRedraw();
    }
  };

  const dropHandler = (
    e: React.DragEvent<HTMLElement>,
    task: BoardTask,
    board: BoardItem,
  ) => {
    if (currentTask && currentBoard) {
      e.preventDefault();
      e.stopPropagation();
      const currentIndex = currentBoard.tasks.indexOf(currentTask);
      const dropIndex = board.tasks.indexOf(task);

      currentBoard.tasks.splice(currentIndex, 1);
      board.tasks.splice(dropIndex + 1, 0, currentTask);
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        }),
      );
      componentRedraw();
    }
  };

  return (
    <div
      className={clsx(styles.column__kanban, {
        [styles.column__kanban_active]: currentTask,
      })}
    >
      {boards.map((board) => (
        <div
          className={styles.column__wrapper}
          key={board.id}
          onDragOver={(e) => dragOverHandlerBoard(e)}
          onDrop={(e) => dropCardHendler(e, board)}
        >
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
              className={clsx(styles.column__task_line, {
                [styles.column__task_line_active]: task.id === hover,
              })}
              key={task.id}
              draggable={true}
              onDragOver={(e) => dragOverHandlerTask(e, task)}
              onDragLeave={() => dragLeaveHandler()}
              onDragStart={() => dragStartHandler(task, board)}
              onDragEnd={() => dragEndHandler()}
              onDrop={(e) => dropHandler(e, task, board)}
            >
              <div
                className={clsx(styles.column__task, {
                  [styles.column__task_drag]: currentTask === task,
                })}
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
