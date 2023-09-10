import styles from './KanbanTable.module.scss';
import clsx from 'clsx';
import { KanbanColumn } from '../kanban-column/KanbanColumn';
import { useDragDropKanban } from '../../hooks/useDragDropKanban';
import type { ColumnType, TaskType } from 'src/services/api/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/services/hooks';
import {
  projectThunks,
  selectCurrentProject,
} from 'src/services/slices/projectSlice';

type KanbanTableProps = {
  columns: ColumnType[];
  setColumns: (value: ColumnType[]) => void;
};

export const KanbanTable = (props: KanbanTableProps) => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);

  const {
    columns,
    currentTask,
    hover,
    dragTaskHandler,
    dragOverColumnHandler,
  } = useDragDropKanban({
    columnItems: props.columns,
    updateColumns: props.setColumns,
  });

  useEffect(() => {
    return () => {
      console.log('unmounting', currentProject);

      if (currentProject) {
        const tasks: TaskType[] = [];

        columns.forEach((column) => {
          tasks.push(...column.tasks);
        });

        dispatch(
          projectThunks.patch({
            ...currentProject,
            tasks,
          }),
        );
      }
    };
  }, [currentProject]);

  const isEmptyTable = () => {
    return columns.every((column) => column.tasks.length < 1);
  };

  return (
    <ul
      className={clsx(styles.column__kanban, {
        [styles.column__kanban_active]: currentTask,
      })}
    >
      {columns.map((column) => {
        return (
          <li
            className={styles.column__wrapper}
            key={column.id}
            onDragOver={(e) => dragOverColumnHandler.over(e)}
            onDrop={(e) => dragOverColumnHandler.drop(e, column)}
          >
            <KanbanColumn
              column={column}
              currentTask={currentTask}
              dragTaskHandler={dragTaskHandler}
              hover={hover}
              isEmptyTable={isEmptyTable()}
            />
          </li>
        );
      })}
    </ul>
  );
};
