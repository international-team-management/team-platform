import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardItem } from 'src/components/kanban-column/Kanban';
import {
  mockBoardItems,
  mockEmptyBoard,
  projects,
} from 'src/utils/constants temporary/constant_temp';

export type ProjectInfo = {
  id: number;
  name: string;
  boards: BoardItem[];
};

const createProjectAPI = (): Promise<ProjectInfo> => {
  const i = projects.length;

  return Promise.resolve({
    id: i + 1,
    name: `Без названия ${i}`,
    boards: mockEmptyBoard,
  });
};

export const useCreateProject = () => {
  const [currentProject, setCurrentProject] = React.useState<ProjectInfo>({
    ...projects[0],
    boards: [],
  });

  const navigate = useNavigate();

  const callback = () => {
    createProjectAPI().then((newProject) => {
      console.log(newProject);
      projects.push(newProject);
      setCurrentProject(newProject);
      window.history.pushState(null, '', `/${newProject.id}`);
      return navigate(`/${projects[projects.length - 1].id}`);
    });
  };

  const createProject = useCallback(callback, [projects, mockEmptyBoard]);

  return [currentProject, setCurrentProject, createProject] as const;
};

export const getProjectInfoAPI = (projectId: number): Promise<ProjectInfo> => {
  if (projectId === 1) {
    return Promise.resolve({
      id: projectId,
      name: 'Пример проекта',
      boards: mockBoardItems,
    });
  } else {
    return Promise.resolve({
      id: projectId,
      name: `Без названия ${projectId - 1}`,
      boards: mockEmptyBoard,
    });
  }
};
