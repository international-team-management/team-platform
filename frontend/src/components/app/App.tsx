import React from 'react';

import styles from './App.module.scss';

export const App:React.FC = () => {
  return (
    <>
      <h1 className={styles.title_large}>Hello World!</h1>
      <h3 className={styles.title_small}>This is the start page of the project</h3>
    </>
  )
}
