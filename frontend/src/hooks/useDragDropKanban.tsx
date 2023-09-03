import React, { useEffect } from 'react';
import { useDispatch } from 'src/services/hooks';
import { updateColumns } from 'src/services/slices/projectSlice';
import type { TaskType, ColumnType } from 'src/services/api/types';

export type dragTaskType = {
  overTask: (e: React.DragEvent<HTMLElement>, task: TaskType) => void;
  leave: () => void;
  start: (task: TaskType, column: ColumnType) => void;
  end: () => void;
  drop: (
    e: React.DragEvent<HTMLElement>,
    task: TaskType,
    column: ColumnType,
  ) => void;
};

export type dragOverColumnType = {
  over: (e: React.DragEvent<HTMLElement>) => void;
  drop: (_e: React.DragEvent<HTMLElement>, column: ColumnType) => void;
};

export type DradDropType = {
  columns: ColumnType[];
  currentTask: TaskType | undefined;
  hover: number | null;
  dragTaskHandler: dragTaskType;
  dragOverColumnHandler: dragOverColumnType;
};

export const useDragDropKanban = (columnItems: ColumnType[]): DradDropType => {
  const [columns, setColumns] = React.useState(columnItems);
  const [currentColumn, setCurrentColumn] = React.useState<ColumnType>();
  const [currentTask, setCurrentTask] = React.useState<TaskType>();
  const [hover, setHover] = React.useState<number | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setColumns(columnItems);
  }, [columnItems]);

  const componentRedraw = () => {
    setHover(null);
    setCurrentTask(undefined);
  };

  const dragTaskHandler = {
    overTask: (e: React.DragEvent<HTMLElement>, task: TaskType) => {
      e.preventDefault();
      setHover(task.id);
    },

    leave: () => {
      setHover(null);
    },

    start: (task: TaskType, column: ColumnType) => {
      setCurrentTask(task);
      setCurrentColumn(column);
    },

    end: () => {
      setHover(null);
      setCurrentTask(undefined);
    },

    drop: (
      e: React.DragEvent<HTMLElement>,
      task: TaskType,
      column: ColumnType,
    ) => {
      if (currentTask && currentColumn) {
        e.preventDefault();
        e.stopPropagation();
        const currentIndex = currentColumn.tasks.indexOf(currentTask);
        const dropIndex = column.tasks.indexOf(task);

        currentColumn.tasks.splice(currentIndex, 1);
        column.tasks.splice(dropIndex + 1, 0, currentTask);
        setColumns(
          columns.map((col) => {
            if (col.id === column.id) {
              return column;
            }
            if (col.id === currentColumn.id) {
              return currentColumn;
            }
            return col;
          }),
        );
        componentRedraw();
      }

      dispatch(updateColumns(columns));
    },
  };

  const dragOverColumnHandler = {
    over: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
    },

    drop: (_e: React.DragEvent<HTMLElement>, column: ColumnType) => {
      if (currentTask && currentColumn) {
        column.tasks.push(currentTask);
        const currentIndex = currentColumn.tasks.indexOf(currentTask);
        currentColumn.tasks.splice(currentIndex, 1);

        setColumns(
          columns.map((col) => {
            if (col.id === column.id) {
              return column;
            }
            if (col.id === currentColumn.id) {
              return currentColumn;
            }
            return col;
          }),
        );
        componentRedraw();
      }

      dispatch(updateColumns(columns));
    },
  };

  return {
    columns,
    currentTask,
    hover,
    dragTaskHandler,
    dragOverColumnHandler,
  };
};
