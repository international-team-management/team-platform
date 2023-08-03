import React from 'react';
import styles from './KanbanPage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderTemplate,
  HeaderState,
} from 'components/UI/header-template/HeaderTemplate';
import { KanbanColumn } from 'src/components/kanban-column/KanbanColumn';

export const KanbanPage: React.FC = () => {
  const state = HeaderState.KANBAN;

  return (
    <section className={styles.kanban}>
      <Sidebar />
      <div className={styles['kanban__main-content']}>
        <HeaderTemplate state={state} title="Пример проекта" />
        <KanbanColumn />
      </div>
    </section>
  );
};
