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

export const KanbanPage = (): JSX.Element => {
  const state = HeaderState.KANBAN;
  const currentProject = useSelector(selectCurrentProject);

  return (
    <section className={styles.kanban}>
      <Sidebar />
      <div className={styles['kanban__main-content']}>
        <HeaderTemplate state={state} view={VIEWS.KANBAN} />
        <KanbanTable columns={currentProject.column} />
      </div>
    </section>
  );
};
