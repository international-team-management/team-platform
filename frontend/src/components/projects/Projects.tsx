import React from "react";
import clsx from "clsx";
import style from './Projects.module.scss';
import iconPath from 'assets/project__icon.svg'
import { NavLink } from "react-router-dom";

type project = {
  id: number,
  name: string
}

type ProjectsProps = {
  projects: project[]
}

export function Projects(props: ProjectsProps): React.ReactNode {

  function renderProjects(): React.ReactNode[] {
    return props.projects.map((project) => {
      return (
        <li key={project.id}>
          <NavLink to={`/${project.id}`} className={
              ({ isActive }) => clsx(style.projects__nav, isActive && style.projects__nav_active)
          }>
            <img className={style.projects__icon} src={iconPath} alt="Иконка проекта" />
            <span className={style.projects__name}>{project.name}</span>
          </NavLink>
        </li>
      )
    })
  }

  return (
    <section className={style.projects}>
      <h3 className={style.projects__header}>Проекты</h3>
      <button className={style.projects__filter}></button>
      <ul className={style.projects__list}>
        {renderProjects()}
      </ul>
    </section>
  )
} 