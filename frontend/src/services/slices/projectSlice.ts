import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectDTO, ProjectType } from '../api/types';
import { RootState } from '../store';
import { projectsAPI } from 'services/api/projectsAPI';

type ProjectStateType = {
  list: ProjectType[];
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
  getList: createAsyncThunk(
    'project/getList',
    async () => await projectsAPI.get(),
  ),

  post: createAsyncThunk(
    'project/post',
    async (data: ProjectDTO, { dispatch }) => {
      await projectsAPI.post(data);
      dispatch(projectThunks.getList());
    },
  ),

  patch: createAsyncThunk('project/patch', async (data: ProjectType) => {
    return await projectsAPI.patch(
      {
        name: data.name,
        description: data.description,
        participants: [],
        tasks: data.tasks,
        start: data.start,
        deadline: data.deadline,
        status: data.status,
        priority: data.priority,
      },
      data.id,
    );
  }),

  delete: createAsyncThunk('project/delete', async (id: number) => {
    await projectsAPI.delete(id);
    return { id };
  }),
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,

  reducers: {
    addProject: () => {
      return;
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = state.list.filter(
        (project) => project.id === action.payload,
      )[0];
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
        (state, action: PayloadAction<ProjectType[]>) => {
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
      .addCase(projectThunks.post.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
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
        (state, action: PayloadAction<ProjectType>) => {
          state.isLoading = false;
          state.error = false;
          state.list = state.list.map((project) => {
            if (project.id === action.payload.id) {
              return action.payload;
            }
            return project;
          });
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
      .addCase(
        projectThunks.delete.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.isLoading = false;
          state.error = false;
          state.list = state.list.filter(
            (project) => project.id !== action.payload.id,
          );
          state.current = null;
        },
      )
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
export const { addProject, setCurrent } = projectSlice.actions;
