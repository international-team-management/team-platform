import styles from './RightSidebarTemplate.module.scss';
import clsx from 'clsx';
import type { ProjectType } from 'src/services/api/types';

export type RightSidebarPropsType = {
  isOpened: boolean;
  close: () => void;
  showActions: () => void;
  project?: ProjectType;
  children?: JSX.Element;
};

export const RightSidebarTemplate = ({
  isOpened,
  close,
  showActions,
  ...props
}: RightSidebarPropsType): JSX.Element => {
  return (
    <section
      className={clsx(styles.sidebar, { [styles.sidebar_opened]: isOpened })}
      aria-label="Right sidebar"
    >
      <button className={styles['sidebar__close-btn']} onClick={close} />
      <button className={styles['sidebar__menu-btn']} onClick={showActions} />
      {props.children}
    </section>
  );
};
