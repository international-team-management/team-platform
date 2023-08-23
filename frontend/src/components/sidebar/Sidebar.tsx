import styles from './Sidebar.module.scss';
import { ReactComponent as SignPlus } from 'assets/sidebar-plus.svg';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';
import { useDispatch, useSelector } from 'src/services/hooks';
import { selectUserMe } from 'src/services/slices/authSlice';
import {
  addProject,
  selectProjects,
  setCurrent,
} from 'src/services/slices/projectSlice';

export const Sidebar = (): JSX.Element => {
  const userMe = useSelector(selectUserMe);
  const projectList = useSelector(selectProjects);
  const dispatch = useDispatch();

  const createNewProject = () => {
    const count = projectList.length;

    dispatch(addProject());
    dispatch(setCurrent(count + 1));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <Account {...userMe} />
        <Projects />
      </div>
      <div className={styles['sidebar__createBtn-container']}>
        <button
          className={`${styles.sidebar__createBtn}`}
          onClick={() => createNewProject()}
        >
          <SignPlus className={styles.sidebar__plus} />
          <span>Создать проект</span>
        </button>
      </div>
    </aside>
  );
};
