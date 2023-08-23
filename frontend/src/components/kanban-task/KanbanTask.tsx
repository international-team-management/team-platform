import styles from '../kanban-table/KanbanTable.module.scss';
import { ReactComponent as MoreActions } from 'assets/more-actions.svg';
import clsx from 'clsx';
import type { TaskType } from 'src/services/api/types';

type PropsType = {
  task: TaskType;
  currentTask: TaskType | undefined;
};

export const KanbanTask = ({ task, currentTask }: PropsType) => {
  return (
    <div
      className={clsx(styles.column__task, {
        [styles.column__task_drag]: currentTask === task,
      })}
    >
      <p className={styles.column__task_text}>{task.subtitle}</p>
      <MoreActions className={styles.column__task_button} />
      <p className={styles.column__task_time}>{task.expiredDate}</p>
      {task.img && (
        <img
          className={styles.column__task_img}
          title="Аватар участника"
          src={task.img}
        />
      )}
    </div>
  );
};
