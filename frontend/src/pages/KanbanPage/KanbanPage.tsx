import React, { useEffect } from 'react';
import styles from './KanbanPage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { KanbanColumn } from 'src/components/kanban-column/Kanban';
import { useParams } from 'react-router-dom';
import { projects } from 'src/utils/constants temporary/constant_temp';
import { useNavigate } from 'react-router-dom';
import { getProjectInfoAPI, useCreateProject } from 'src/utils/createProject';

export const KanbanPage: React.FC = () => {
  const navigate = useNavigate();
  const state = HeaderState.KANBAN;

  const params = useParams();
  const [currentProject, setCurrentProject, createProject] = useCreateProject();

  useEffect(() => {
    if (!params.id) {
      return navigate(`/${projects[0].id}`);
    }

    getProjectInfoAPI(Number(params.id)).then((projectInfo) => {
      setCurrentProject(projectInfo);
    });
  }, [params, navigate, setCurrentProject]);

  return (
    <section className={styles.kanban}>
      <Sidebar createProject={createProject} />
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
