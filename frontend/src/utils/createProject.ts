import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnItem } from 'src/components/kanban-table/KanbanTable';
import {
  mockColumnItems,
  mockEmptyColumn,
  projects,
} from 'src/utils/constants temporary/constant_temp';

export type ProjectInfo = {
  id: number;
  name: string;
  columns: ColumnItem[];
};

const createProjectAPI = (): Promise<ProjectInfo> => {
  const i = projects.length;

  return Promise.resolve({
    id: i + 1,
    name: `Без названия ${i}`,
    columns: mockEmptyColumn,
  });
};

export const useCreateProject = () => {
  const [currentProject, setCurrentProject] = React.useState<ProjectInfo>({
    ...projects[0],
    columns: [],
  });

  const navigate = useNavigate();

  const callback = () => {
    createProjectAPI().then((newProject) => {
      projects.push(newProject);
      setCurrentProject(newProject);
      window.history.pushState(null, '', `/${newProject.id}`);
      return navigate(`/${projects[projects.length - 1].id}`);
    });
  };

  const createProject = useCallback(callback, [navigate]);

  return [currentProject, setCurrentProject, createProject] as const;
};

export const getProjectInfoAPI = (projectId: number): Promise<ProjectInfo> => {
  if (projectId === 1) {
    return Promise.resolve({
      id: projectId,
      name: 'Пример проекта',
      columns: mockColumnItems,
    });
  } else {
    return Promise.resolve({
      id: projectId,
      name: `Без названия ${projectId - 1}`,
      columns: mockEmptyColumn,
    });
  }
};
