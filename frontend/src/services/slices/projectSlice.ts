import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectType } from '../api/types';
import { RootState } from '../store';

type ProjectStateType = {
  list: any | ProjectType[];
  current: null | ProjectType;
  isLoading: boolean;
  error: null | unknown | string;
};

const initialState: ProjectStateType = {
  list: [],
  current: null,
  isLoading: false,
  error: null,
};

// < < <  TODO: дописать асинки (обращения к серверу) функции брать из projectsAPI.ts  > > >
export const projectThunks = {
  getList: createAsyncThunk('project/getList', async () => {
    return;
  }),

  post: createAsyncThunk('project/post', async () => {
    return;
  }),

  patch: createAsyncThunk('project/patch', async () => {
    return;
  }),

  delete: createAsyncThunk('project/delete', async () => {
    return;
  }),
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,

  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = state.list[action.payload - 1];
    },
  },

  extraReducers: (builder) => {
    builder
      // get list of projects
      .addCase(projectThunks.getList.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.getList.fulfilled,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = false;
          state.list = action.payload;
        },
      )
      .addCase(
        projectThunks.getList.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )

      // post project
      .addCase(projectThunks.post.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.post.fulfilled,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = false;
          state.list = state.list.push(action.payload);
        },
      )
      .addCase(
        projectThunks.post.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )

      // patch project
      .addCase(projectThunks.patch.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.patch.fulfilled,
        (state, action: PayloadAction<ProjectType | unknown>) => {
          state.isLoading = false;
          state.error = false;
          const patched = action.payload;
          if (patched) {
            state.list = state.list.filter(
              (project: ProjectType) => project?.id !== patched?.id,
            );
            state.list.push(action.payload);
          }
        },
      )
      .addCase(
        projectThunks.patch.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )

      // delete project
      .addCase(projectThunks.delete.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(projectThunks.delete.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(
        projectThunks.delete.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const selectProjects = (state: RootState) => state.projects.list;
export const selectCurrentProject = (state: RootState) =>
  state.projects.current;

// < < <  TODO: экспортировать действия для проектов (создать, получить, пропатчить..),
// импортировать в компоненты KanbanPage и другие > > >
export const { addProject, setCurrent, updateColumns } = projectSlice.actions;
