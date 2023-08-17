import React from 'react';
import clsx from 'clsx';
import style from './Projects.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProjectIcon } from 'assets/project-icon.svg';
import {
  selectProjectInfo,
  setCurrent,
} from 'src/services/slices/projectSlice';
import { useDispatch, useSelector } from 'src/services/hooks';

export const Projects = (): JSX.Element => {
  const projectsArr = useSelector(selectProjectInfo);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const arr = e.currentTarget.id.split('-');
    const id = arr[0];
    dispatch(setCurrent(Number(id)));
  };

  function renderProjects(): React.ReactNode[] {
    return projectsArr.map((project) => {
      return (
        <li key={project.id}>
          <NavLink
            to={`/${project.id}`}
            className={({ isActive }) =>
              clsx(style.projects__nav, isActive && style.projects__nav_active)
            }
            onClick={(e) => handleClick(e)}
            id={`${project.id}-project`}
          >
            <ProjectIcon className={style.projects__icon} />
            <span className={style.projects__name}>{project.name}</span>
          </NavLink>
        </li>
      );
    });
  }

  return (
    <section className={style.projects}>
      <h3 className={style.projects__title}>Проекты</h3>
      <button className={style.projects__filter}></button>
      <ul className={style.projects__list}>{renderProjects()}</ul>
    </section>
  );
};
