import React from "react";
import style from './Account.module.scss';

type AccountProps = {
  imgSrc?: string;
  firstName: string;
  lastName: string;
  role?: string
}

export function Account(props: AccountProps): React.ReactNode {
  // TODO: если нет imgSrc, тогда отобразить инициалы
  return (
    <figure className={style.account}>
      <img
        className={style.account__image}
        src={props.imgSrc}
        alt={`${props.firstName} ${props.lastName}`}
      />
      
      <figcaption className={style.account__caption}>
        <p className={style.account__user}>{`${props.firstName} ${props.lastName}`}</p>
        <p className={style.account__role}>{props.role}</p>
      </figcaption>
    </figure>
  )
}
