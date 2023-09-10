import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useDispatch, useSelector } from 'src/services/hooks';
import {
  selectCurrentProject,
  selectProjects,
  setCurrent,
} from 'src/services/slices/projectSlice';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';
import { ColumnType } from 'src/services/api/types';

const columnsMock: ColumnType[] = [
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

export const KanbanPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(columnsMock);

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

  useEffect(() => {
    if (!currentProject) return;

    const newColumnsState = structuredClone(columnsMock);

    currentProject.tasks.forEach((task) => {
      if (task.status === 'backlog') {
        newColumnsState[0].tasks.push(task);
      }

      if (task.status === 'todo') {
        newColumnsState[1].tasks.push(task);
      }
      if (task.status === 'in_progress') {
        newColumnsState[2].tasks.push(task);
      }
      if (task.status === 'in_review') {
        newColumnsState[3].tasks.push(task);
      }
      if (task.status === 'done') {
        newColumnsState[4].tasks.push(task);
      }
    });

    setColumns(newColumnsState);
  }, [currentProject]);

  return (
    <section className="content">
      <KanbanTable columns={columns} setColumns={setColumns} />

      <ProjectSidebar showActions={showProjectActions} />
    </section>
  );
};
