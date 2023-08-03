import styles from './AddTask.module.scss';

export const AddTask = () => {
  return (
    <div className={styles.task}>
      <div className={styles.task__wrapper}>
        <button className={styles.task__button} />
        <h3 className={styles.task__text}>Добавить задачу</h3>
      </div>
    </div>
  );
};
