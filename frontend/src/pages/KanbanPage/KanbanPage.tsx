import React, { useEffect, useState } from 'react';
import styles from './KanbanPage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useParams } from 'react-router-dom';
import { projects } from 'src/utils/constants temporary/constant_temp';
import { useNavigate } from 'react-router-dom';
import { getProjectInfoAPI, useCreateProject } from 'src/utils/createProject';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';

export const KanbanPage: React.FC = () => {
  const navigate = useNavigate();
  const state = HeaderState.KANBAN;

  const params = useParams();
  const [currentProject, setCurrentProject, createProject] = useCreateProject();

  const [isProjectSidebar, setIsProjectSidebar] = useState(true);

  useEffect(() => {
    if (!params.id) {
      return navigate(`/${projects[0].id}`);
    }

    getProjectInfoAPI(Number(params.id)).then((projectInfo) => {
      setCurrentProject(projectInfo);
    });
  }, [params, navigate, setCurrentProject]);

  const closeAllSidebars = () => {
    setIsProjectSidebar(false);
    console.log('closeAllSidebars');
  };

  const showProjectActions = () => {
    console.log('showProjectActions');
  };

  return (
    <>
      <section className={styles.kanban}>
        <Sidebar createProject={createProject} />
        <div className={styles['kanban__main-content']}>
          <HeaderTemplate state={state} title={currentProject.name} />
          <KanbanTable columns={currentProject.columns} />
        </div>
      </section>

      <ProjectSidebar
        isOpened={isProjectSidebar}
        close={closeAllSidebars}
        showActions={showProjectActions}
      />
    </>
  );
};
