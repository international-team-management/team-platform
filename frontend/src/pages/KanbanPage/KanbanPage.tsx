import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/slices/projectSlice';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';

export const KanbanPage = (): JSX.Element => {
  const currentProject = useSelector(selectCurrentProject);
  const copy = structuredClone(currentProject);

  const showProjectActions = () => {
    console.log('showProjectActions');
  };

  return (
    <section className="content">
      <KanbanTable columns={copy.columns} />

      <ProjectSidebar
        showActions={showProjectActions}
        project={currentProject}
      />
    </section>
  );
};
