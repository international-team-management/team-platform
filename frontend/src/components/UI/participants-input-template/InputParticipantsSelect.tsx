import { useState } from 'react';
import Select from 'react-select';
import styles from './InputParticipantsSelect.module.scss';
import './SelectParticipantsComponent.scss';
import addSuceess from 'src/assets/add_success.svg';
import searchIcon from 'src/assets/header-icons/header-search-icon.svg';

export const InputParticipantsSelect = (): JSX.Element => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleAddNewMember = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const options = [
    {
      value: 'me',
      label: 'Montenegro',
      image:
        'https://s1.1zoom.ru/b5050/243/Big_cats_Leopards_Snout_479812_1920x1200.jpg',
      inTeam: true,
    },
    {
      value: 'rs',
      label: 'Serbia',
      image:
        'https://i.pinimg.com/originals/8a/a7/83/8aa7831e22f8d5c74aecfe0c0e6953e3.jpg',
      inTeam: true,
    },
    {
      value: 'me',
      label: 'Montenegro',
      image:
        'https://s1.1zoom.ru/b5050/243/Big_cats_Leopards_Snout_479812_1920x1200.jpg',
      inTeam: false,
    },
    {
      value: 'me',
      label: 'Montenegro',
      image:
        'https://s1.1zoom.ru/b5050/243/Big_cats_Leopards_Snout_479812_1920x1200.jpg',
      inTeam: true,
    },
    {
      value: 'rs',
      label: 'Serbia',
      image:
        'https://i.pinimg.com/originals/8a/a7/83/8aa7831e22f8d5c74aecfe0c0e6953e3.jpg',
      inTeam: false,
    },
    {
      value: 'me',
      label: 'Montenegro',
      image:
        'https://s1.1zoom.ru/b5050/243/Big_cats_Leopards_Snout_479812_1920x1200.jpg',
      inTeam: true,
    },
    {
      value: 'me',
      label: 'Montenegro',
      image:
        'https://s1.1zoom.ru/b5050/243/Big_cats_Leopards_Snout_479812_1920x1200.jpg',
      inTeam: true,
    },
    {
      value: 'rs',
      label: 'Serbia',
      image:
        'https://i.pinimg.com/originals/8a/a7/83/8aa7831e22f8d5c74aecfe0c0e6953e3.jpg',
      inTeam: false,
    },
    {
      value: 'me',
      label: 'Montenegro',
      image:
        'https://s1.1zoom.ru/b5050/243/Big_cats_Leopards_Snout_479812_1920x1200.jpg',
      inTeam: true,
    },
  ];

  const avatars = options.filter((_, i) => i < 4);

  const buttonNumber = (arr: object[]): string => {
    if (arr.length <= 4) {
      return '+';
    } else {
      return `+${arr.length - 4}`;
    }
  };

  return (
    <div className={styles.participants}>
      <div className={styles.participants__container}>
        {avatars.map((option) => (
          <img
            className={styles.participants__avatar}
            src={option.image}
            alt={option.label}
          />
        ))}
        <button
          type="button"
          className={styles.participants__avatar}
          onClick={handleAddNewMember}
        >
          {buttonNumber(options)}
        </button>
        <div
          className={`${styles.participants__select} ${
            isSelectOpen ? styles.participants__select_opened : ''
          }`}
        >
          <label>
            <Select
              autoFocus
              menuIsOpen
              controlShouldRenderValue={false}
              unstyled={true}
              classNamePrefix={'participants-select'}
              options={options}
              components={{ DropdownIndicator: () => <img src={searchIcon} /> }}
              placeholder={'Найти участника'}
              formatOptionLabel={(option) => (
                <div className={styles.participants__option}>
                  <img
                    className={styles.participants__option_img}
                    src={option.image}
                    alt="country-image"
                  />
                  <span className={styles.participants__option_span}>
                    {option.label}
                  </span>
                  <img
                    className={`${styles.participants__option_selected} ${
                      option.inTeam
                        ? styles.participants__option_selected_visible
                        : ''
                    }`}
                    src={addSuceess}
                    alt="country-selected"
                  />
                </div>
              )}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
