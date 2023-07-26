import React from 'react';
import styles from './UserAvatar.module.scss';

interface User {
  name: string;
  src: string;
}

interface UserAvatarProps {
  users: User[];
}

export const UserAvatar: React.FC<UserAvatarProps> = ({users}) => {
  return (
    <div className={styles.avatar}>
      {users.map((user) => (
        <img className={styles.avatar__image} key={user.name} src={user.src} alt={user.name}/>
      ))}
    </div>
  );
};


