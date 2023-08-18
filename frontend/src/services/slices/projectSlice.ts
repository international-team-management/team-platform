import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  mockColumnItems,
  mockEmptyColumn,
} from 'src/utils/constants temporary/constant_temp';
import { RootState } from '../store';
import { ColumnItem } from 'src/components/kanban-table/KanbanTable';

const initialState = {
  list: [{ id: 1, name: 'Пример проекта', column: mockColumnItems }],
  current: { id: 1, name: 'Пример проекта', column: mockColumnItems },
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state) => {
      const i = state.list.length;
      state.list.push({
        id: i + 1,
        name: `Без названия ${i}`,
        column: mockEmptyColumn,
      });
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = state.list[action.payload - 1];
    },
    updateColumn: (state, action: PayloadAction<ColumnItem[]>) => {
      state.current.column = action.payload;
    },
  },
});

export const selectProjectInfo = (state: RootState) => state.projects.list;
export const selectCurrentProject = (state: RootState) =>
  state.projects.current;

export const { addProject, setCurrent, updateColumn } = projectSlice.actions;
