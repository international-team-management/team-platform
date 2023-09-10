import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useDispatch, useSelector } from 'src/services/hooks';
import {
  selectCurrentProject,
  selectProjects,
  setCurrent,
} from 'src/services/slices/projectSlice';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';

export const KanbanPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const currentProject = useSelector(selectCurrentProject);
  const projects = useSelector(selectProjects);

  const showProjectActions = () => {
    console.log('showProjectActions');
  };

  useEffect(() => {
    if (projects.length === 0) return;

    dispatch(setCurrent(Number(pathname.slice(1))));
  }, [projects]);

  return (
    <section className="content">
      {currentProject && (
        <KanbanTable columns={structuredClone(currentProject.columns)} />
      )}

      <ProjectSidebar showActions={showProjectActions} />
    </section>
  );
};
