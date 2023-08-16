import clsx from 'clsx';
import styles from './TeamPage.module.scss';
import { TeamArea } from 'src/components/team-area/TeamArea';
import { TeamIntersections } from 'src/components/team-intersections/TeamIntersections';
import { TeamForm } from 'src/components/team-form/TeamForm';

export const TeamPage = (): JSX.Element => {
  return (
    <section className={clsx('content', styles.team)}>
      <TeamIntersections />
      <TeamForm />
      <TeamArea />
    </section>
  );
};
