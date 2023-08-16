import styles from './KanbanPage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
  VIEWS,
} from 'components/UI/header-template/HeaderTemplate';
import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/slices/projectSlice';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';


export const KanbanPage = (): JSX.Element => {
  const state = HeaderState.KANBAN;

  const currentProject = useSelector(selectCurrentProject);
  const [currentProject, setCurrentProject, createProject] = useCreateProject();

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
        <Sidebar />
        <div className={styles['kanban__main-content']}>
          <HeaderTemplate state={state} view={VIEWS.KANBAN} />
          <KanbanTable columns={currentProject.column} />
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
