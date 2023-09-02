import styles from './Popup.module.scss';

type PopupButton = {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type PopupTemplateProps = {
  buttons: PopupButton[];
};

export const PopupTemplate = ({ buttons }: PopupTemplateProps): JSX.Element => {
  return (
    <section className={styles.popup}>
      {buttons.map((button, index) => (
        <button
          className={styles.popup__button}
          onClick={button.onClick}
          key={index}
        >
          {button.title}
        </button>
      ))}
    </section>
  );
};
