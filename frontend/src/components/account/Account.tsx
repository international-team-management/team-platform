import React from "react";
import style from './Account.module.scss';

type AccountProps = {
  imgSrc: string;
  name: string;
  surname: string;
  role?: string
}

export function Account(props: AccountProps): React.ReactNode {
  return (
    <figure className={style.account}>
      <img
        className={style.account__image}
        src={props.imgSrc}
        alt={`${props.name} ${props.surname}`}
      />
      
      <figcaption className={style.account__caption}>
        <p className={style.account__user}>{`${props.name} ${props.surname}`}</p>
        <p className={style.account__role}>{props.role}</p>
      </figcaption>
    </figure>
  )
}
