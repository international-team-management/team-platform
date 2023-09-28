import styles from './PopupWithConfirmation.module.scss';

type PopupPropsType = {
  name: string;
  title: string;
  isOpen: boolean;
  // onClose: ;
  children: string;
  confirmation: string;
  reject: string;
};

export const PopupWithConfirmation: React.FC<PopupPropsType> = (props) => {
  return (
    <div
      className={`${styles.popup} ${styles[`popup_${props.name}`]} ${
        props.isOpen ? styles.popup_opened : ''
      }`}
    >
      <div className={styles.popup__container}>
        <button
          className={styles.popup__close}
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className={styles.popup__title}>{props.title}</h2>
        <div className={styles.popup__form}>
          {props.children}
          <button className={styles.popup__button_confirmation} type="submit">
            {props.confirmation}
          </button>
          <button className={styles.popup__button_reject} type="button">
            {props.reject}
          </button>
        </div>
      </div>
    </div>
  );
};
