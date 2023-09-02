import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  mockColumnItems,
  mockEmptyColumn,
} from 'src/utils/constants temporary/constant_temp';
import { RootState } from '../store';
import type { ColumnType } from '../api/types';

const mockProject = {
  id: 1,
  name: 'Пример проекта',
  description:
    'Здесь оставляйте описание проекта, дополнительные комментарии, ссылки на ресурсы',
  status: '',
  priority: '',
  deadline: '',
  columns: mockColumnItems,

  owner: null,
  participants: null,
  tasks: [],
  start: '',
};

const initialState = {
  list: [mockProject],
  current: mockProject,
};

// Use it if the mock project is stored on the backend
// const initialState = {
//   list: [],
//   current: null
// }

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state) => {
      const i = state.list.length;
      state.list.push({
        ...mockProject,
        id: i + 1,
        name: `Без названия ${i}`,
        columns: mockEmptyColumn,
      });
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = state.list[action.payload - 1];
    },
    updateColumns: (state, action: PayloadAction<ColumnType[]>) => {
      state.current.columns = action.payload;
    },
  },
});

export const selectProjects = (state: RootState) => state.projects.list;
export const selectCurrentProject = (state: RootState) =>
  state.projects.current;

export const { addProject, setCurrent, updateColumns } = projectSlice.actions;
