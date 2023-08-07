import styles from './AddTask.module.scss';
import { ReactComponent as PlusTask } from 'assets/plus.svg';
import { BoardItem } from 'src/components/kanban-column/Kanban';

type AddTaskProps = {
  board: BoardItem;
};

export const AddTask = ({ board }: AddTaskProps) => {
  return (
    <>
      {board.title !== 'In Review' && board.title !== 'Done' ? (
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
