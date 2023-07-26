import React from "react";
import style from './Account.module.scss';
import type { UserType } from "src/services/api/types";


export function Account(props: UserType): React.ReactNode {
  return (
    <figure className={style.account}>
      <img
        className={style.account__image}
        src={props.photo}
        alt={`${props.first_name} ${props.last_name}`}
      />
      
      <figcaption className={style.account__caption}>
        <p className={style.account__user}>{`${props.first_name} ${props.last_name}`}</p>
        <p className={style.account__role}>{props.role}</p>
      </figcaption>
    </figure>
  )
}
