import React from "react";
import clsx from "clsx";
import style from './Projects.module.scss';
import iconPath from 'assets/project__icon.svg'
import { NavLink } from "react-router-dom";

export function Projects(): React.ReactNode {

  // данные о проектах передадим сюда из Redux, ниже демка данных
  type project = {
    id: number,
    name: string
  }
  const projects: project[] = [
    { id: 1, name: 'Название проекта 1' },
    { id: 2, name: 'Название проекта длиною в жизнь' },
    { id: 3, name: 'Название проекта 3' },
  ]

  function renderProjects(): React.ReactNode[] {
    return projects.map((project) => {
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