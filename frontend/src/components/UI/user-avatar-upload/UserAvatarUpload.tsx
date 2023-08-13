import { InputName, InputType } from 'src/typings/constants';
import styles from './UserAvatarUpload.module.scss';
import React from 'react';
import { AvatarIcon } from '../avatar-icon/AvatarIcon';
import { encodeBase64 } from 'src/utils/encodeBase64';
import { authThunks } from 'src/services/slices/authSlice';
import { useDispatch } from 'src/services/hooks';

export const UserAvatarUpload = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const avatar = await encodeBase64(event);

    if (typeof avatar === 'string') {
      dispatch(authThunks.patchMe({ [InputName.PHOTO]: avatar }));
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
