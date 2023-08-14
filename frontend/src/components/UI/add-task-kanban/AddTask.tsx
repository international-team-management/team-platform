import styles from './AddTask.module.scss';
import { ReactComponent as PlusTask } from 'assets/plus.svg';
import { ColumnItem } from 'src/components/kanban-table/KanbanTable';

type AddTaskProps = {
  column: ColumnItem;
};

export const AddTask = ({ column }: AddTaskProps) => {
  return (
    <>
      {column.title !== 'In Review' && column.title !== 'Done' ? (
        <div className={styles.task}>
          <button className={styles.task__wrapper}>
            <PlusTask className={styles.task__button} />
            <h3 className={styles.task__text}>Добавить задачу</h3>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
