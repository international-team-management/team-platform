import styles from './TeamPage.module.scss';
import { Sidebar } from 'src/components/sidebar/Sidebar';
import {
  HeaderState,
  HeaderTemplate,
  VIEWS,
} from 'src/components/UI/header-template/HeaderTemplate';

export const TeamPage = (): JSX.Element => {
  const state = HeaderState.KANBAN;

  return (
    <section>
      <Sidebar />
      <div className={styles['team__main-content']}>
        <HeaderTemplate state={state} view={VIEWS.TEAM} />
        <h1>FORZA JUVE</h1>
      </div>
    </section>
  );
};
