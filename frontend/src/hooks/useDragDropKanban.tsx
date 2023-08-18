import React, { useEffect } from 'react';
import { ColumnTask, ColumnItem } from '../components/kanban-table/KanbanTable';
import { useDispatch } from 'src/services/hooks';
import { updateColumn } from 'src/services/slices/projectSlice';

export type dragTaskType = {
  overTask: (e: React.DragEvent<HTMLElement>, task: ColumnTask) => void;
  leave: () => void;
  start: (task: ColumnTask, column: ColumnItem) => void;
  end: () => void;
  drop: (
    e: React.DragEvent<HTMLElement>,
    task: ColumnTask,
    column: ColumnItem,
  ) => void;
};

export type dragOverColumnType = {
  over: (e: React.DragEvent<HTMLElement>) => void;
  drop: (_e: React.DragEvent<HTMLElement>, column: ColumnItem) => void;
};

export type DradDropType = {
  columns: ColumnItem[];
  currentTask: ColumnTask | undefined;
  hover: number | null;
  dragTaskHandler: dragTaskType;
  dragOverColumnHandler: dragOverColumnType;
};

export const useDragDropKanban = (columnItems: ColumnItem[]): DradDropType => {
  const [columns, setColumns] = React.useState(columnItems);
  const [currentColumn, setCurrentColumn] = React.useState<ColumnItem>();
  const [currentTask, setCurrentTask] = React.useState<ColumnTask>();
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
    overTask: (e: React.DragEvent<HTMLElement>, task: ColumnTask) => {
      e.preventDefault();
      setHover(task.id);
    },

    leave: () => {
      setHover(null);
    },

    start: (task: ColumnTask, column: ColumnItem) => {
      setCurrentTask(task);
      setCurrentColumn(column);
    },

    end: () => {
      setHover(null);
      setCurrentTask(undefined);
    },

    drop: (
      e: React.DragEvent<HTMLElement>,
      task: ColumnTask,
      column: ColumnItem,
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

      dispatch(updateColumn(columns));
    },
  };

  const dragOverColumnHandler = {
    over: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
    },

    drop: (_e: React.DragEvent<HTMLElement>, column: ColumnItem) => {
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

      dispatch(updateColumn(columns));
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
