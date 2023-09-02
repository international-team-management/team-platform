import { AddMember } from 'src/components/comand-add-member/AddMember';

import clsx from 'clsx';
import styles from './TeamPage.module.scss';
import { TeamArea } from 'src/components/team-area/TeamArea';
import { TeamIntersections } from 'src/components/team-intersections/TeamIntersections';

export const TeamPage = (): JSX.Element => {
  return (
    <section className={clsx('content', styles.team)}>
      <TeamIntersections />
      <AddMember />
      <TeamArea />
    </section>
  );
};
