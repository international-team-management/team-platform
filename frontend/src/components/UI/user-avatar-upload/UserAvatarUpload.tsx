import { InputName, InputType } from 'src/typings/constants';
import styles from './UserAvatarUpload.module.scss';
import React, { createRef, useEffect, useState } from 'react';
import { AvatarIcon } from '../avatar-icon/AvatarIcon';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUserMe } from 'src/services/slices/authSlice';

export const UserAvatarUpload = (): JSX.Element => {
  const [image, setImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cropData, setCropData] = useState('#');
  const cropperRef = createRef<ReactCropperElement>();
  const inputRef = createRef<HTMLInputElement>();

  const userMe = useSelector(selectUserMe);

  // const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   const { name, files } = event.currentTarget;

  //   console.log(name, files);

  //   if (files?.length === 1) {
  //     const newAvatar = files[0];
  //     console.log(newAvatar.name);
  //     const formData = new FormData();
  //     formData.append(InputName.PHOTO, newAvatar, newAvatar.name);
  //   }
  // };

  const handleAddImage = (e: any) => {
    e.preventDefault();

    const files = e.target.files;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      setIsOpen(!isOpen);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.type);
    e.currentTarget.type == 'submit' && setIsOpen(!isOpen);
  };

  const handleSaveCrop = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const formData = new FormData();
      formData.append(InputName.PHOTO, cropData);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteCrop = () => {
    setIsOpen(!isOpen);
    setImage('');

    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <div className={styles.avatar}>
        <AvatarIcon />
        <label className={styles.upload}>
          <input
            id={InputName.PHOTO}
            className={styles.upload__input}
            type={image === '' || !userMe?.photo ? InputType.FILE : 'submit'}
            accept="image/*"
            onChange={handleAddImage}
            onClick={handleOpenModal}
            name={InputName.PHOTO}
            ref={inputRef}
          />
          <span className={styles.upload__title}>Загрузить фотографию</span>
        </label>
      </div>
      {isOpen && (
        <div className={styles.cropper}>
          <div className={styles.cropper__wrapper}>
            <CloseIcon
              className={styles.cropper__close}
              onClick={handleCloseModal}
            />
            <h3 className={styles.cropper__title}>
              Загрузить фотографию профиля
            </h3>
            <div className={styles.cropper__content}>
              <Cropper
                style={{ width: '450px', height: 'auto' }}
                src={image}
                ref={cropperRef}
                background={false}
                guides={false}
                viewMode={3}
              />
            </div>
            <div className={styles['cropper__button-wrapper']}>
              <button
                className={clsx(
                  styles.cropper__button,
                  styles.cropper__button_save,
                )}
                onClick={handleSaveCrop}
              >
                Кадрировать и сохранить
              </button>
              <button
                className={clsx(
                  styles.cropper__button,
                  styles.cropper__button_delete,
                )}
                onClick={handleDeleteCrop}
              >
                Удалить фото
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
