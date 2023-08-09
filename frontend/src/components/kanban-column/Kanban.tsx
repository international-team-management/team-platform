import React, { useEffect } from 'react';
import styles from './Kanban.module.scss';
import { ReactComponent as TimerKanban } from 'assets/timer.svg';
import { ReactComponent as AddTaskButton } from 'assets/add-task.svg';
import { ReactComponent as MoreActions } from 'assets/more-actions.svg';
import clsx from 'clsx';
import { AddTask } from '../UI/add-task-kanban/AddTask';

type BoardTask = {
  id: number;
  subtitle: string;
  expiredDate: string;
  img: any;
};

export type BoardItem = {
  id: number;
  title: string;
  tasks: BoardTask[];
};

type KanbanColumnProps = {
  name: string;
  boards: BoardItem[];
};

export const KanbanColumn = (props: KanbanColumnProps) => {
  const [boards, setBoards] = React.useState(props.boards);
  const [name, setName] = React.useState(props.name);
  const [currentBoard, setCurrentBoard] = React.useState<BoardItem>();
  const [currentTask, setCurrentTask] = React.useState<BoardTask>();
  const [hover, setHover] = React.useState<number | null>(null);

  useEffect(() => {
    setBoards(props.boards);
    setName(props.name);
  }, [props.boards, props.name]);

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
    <ul
      className={clsx(styles.column__kanban, {
        [styles.column__kanban_active]: currentTask,
      })}
    >
      {boards.map((board) => (
        <li
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
            {board.title !== 'In Review' && board.title !== 'Done' ? (
              <AddTaskButton className={styles.column__button} />
            ) : (
              <></>
            )}
          </div>
          {name.indexOf('Без названия') === -1 ? (
            board.tasks.map((task) => (
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
                  <MoreActions className={styles.column__task_button} />
                  <div className={styles.column__task_wrapper}>
                    <TimerKanban className={styles.column__task_icon} />
                    <p className={styles.column__task_time}>
                      {task.expiredDate}
                    </p>
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
            ))
          ) : (
            <AddTask board={board} />
          )}
        </li>
      ))}
    </ul>
  );
};
