import React, { useEffect } from 'react';
import styles from './KanbanPage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { KanbanColumn, BoardItem } from 'src/components/kanban-column/Kanban';
import { useParams } from 'react-router-dom';
import {
  mockEmptyBoard,
  mockBoardItems,
  projects,
} from 'src/utils/constants temporary/constant_temp';
import { useNavigate } from 'react-router-dom';

export const KanbanPage: React.FC = () => {
  const navigate = useNavigate();
  const state = HeaderState.KANBAN;
  const [currentProject, setCurrentProject] = React.useState<ProjectInfo>({
    ...projects[0],
    boards: [],
  });
  const params = useParams();

  const createProgect = () => {
    createProjectAPI().then((newProject) => {
      projects.push({ id: newProject.id, name: newProject.name });
      setCurrentProject(newProject);
      window.history.pushState(null, '', `/${newProject.id}`);
    });
  };

  useEffect(() => {
    if (!params.id) {
      return navigate(`/${projects[0].id}`);
    }

    getProjectInfoAPI(Number(params.id)).then((projectInfo) => {
      setCurrentProject(projectInfo);
    });
  }, [params]);

  return (
    <section className={styles.kanban}>
      <Sidebar createProgect={createProgect} />
      <div className={styles['kanban__main-content']}>
        <HeaderTemplate state={state} title={currentProject.name} />
        <KanbanColumn
          boards={currentProject.boards}
          name={currentProject.name}
        />
      </div>
    </section>
  );
};

// Временное решение пока нет backend

type ProjectInfo = {
  id: number;
  name: string;
  boards: BoardItem[];
};

function getProjectInfoAPI(projectId: number): Promise<ProjectInfo> {
  if (projectId === 1) {
    return Promise.resolve({
      id: projectId,
      name: 'Пример проекта',
      boards: mockBoardItems,
    });
  } else {
    return Promise.resolve({
      id: projectId,
      name: 'Без названия',
      boards: mockEmptyBoard,
    });
  }
}

function createProjectAPI(): Promise<ProjectInfo> {
  return Promise.resolve({
    id: projects.length + 1,
    name: 'Без названия',
    boards: mockEmptyBoard,
  });
}
