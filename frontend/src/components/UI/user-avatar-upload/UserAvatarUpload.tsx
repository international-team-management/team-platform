import { InputName, InputType } from 'src/typings/constants';
import styles from './UserAvatarUpload.module.scss';
import React from 'react';
import { AvatarIcon } from '../avatar-icon/AvatarIcon';

export const UserAvatarUpload = (): JSX.Element => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, files } = event.currentTarget;

    console.log(name, files);

    if (files?.length === 1) {
      const newAvatar = files[0];
      console.log(newAvatar.name);
      const formData = new FormData();
      formData.append(InputName.PHOTO, newAvatar, newAvatar.name);
    }
  };

  return (
    <div className={styles.avatar}>
      <AvatarIcon />
      <label className={styles.upload}>
        <input
          id={InputName.PHOTO}
          className={styles.upload__input}
          type={InputType.FILE}
          accept="image/*"
          onChange={handleChange}
          name={InputName.PHOTO}
        />
        <span className={styles.upload__title}>Загрузить фотографию</span>
      </label>
    </div>
  );
};
