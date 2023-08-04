import styles from './AddTask.module.scss';
import { ReactComponent as PlusTask } from 'assets/plus.svg';

export const AddTask = () => {
  return (
    <div className={styles.task}>
      <button className={styles.task__wrapper}>
        <PlusTask className={styles.task__button} />
        <h3 className={styles.task__text}>Добавить задачу</h3>
      </button>
    </div>
  );
};
