import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ColumnType, CurrentProjectType, ProjectType } from '../api/types';
import { RootState } from '../store';
import { projectsAPI } from 'services/api/projectsAPI';

type ProjectStateType = {
  list: ProjectType[];
  current: null | CurrentProjectType;
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
    async (data: Omit<ProjectType, 'id' | 'owner'>) =>
      await projectsAPI.post(data),
  ),

  patch: createAsyncThunk(
    'project/patch',
    async (data: ProjectType) => await projectsAPI.patch(data),
  ),

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
      const project = state.list[action.payload - 1];
      const columns: ColumnType[] = [
        {
          id: 1,
          title: 'Backlog',
          tasks: [],
        },
        {
          id: 2,
          title: 'To Do',
          tasks: [],
        },
        {
          id: 3,
          title: 'In Progress',
          tasks: [],
        },
        {
          id: 4,
          title: 'In Review',
          tasks: [],
        },
        {
          id: 5,
          title: 'Done',
          tasks: [],
        },
      ];

      project.tasks.forEach((task) => {
        if (task.status === 'backlog') {
          columns[0].tasks.push(task);
        }

        if (task.status === 'todo') {
          columns[1].tasks.push(task);
        }
        if (task.status === 'in_progress') {
          columns[2].tasks.push(task);
        }
        if (task.status === 'in_review') {
          columns[3].tasks.push(task);
        }
        if (task.status === 'done') {
          columns[4].tasks.push(task);
        }
      });

      state.current = {
        ...project,
        columns,
      };
    },

    updateColumns: (state, action: PayloadAction<ColumnType[]>) => {
      state.current!.columns = action.payload;
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
      .addCase(
        projectThunks.post.fulfilled,
        (state, action: PayloadAction<ProjectType>) => {
          state.isLoading = false;
          state.error = false;
          state.list = [...state.list, action.payload];
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
export const { addProject, setCurrent, updateColumns } = projectSlice.actions;
