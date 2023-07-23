import React from 'react';

import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'src/routes';
import { LoginPage } from 'src/pages/LoginPage/LoginPage';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';

export const App:React.FC = () => {

  

  return (
    <Routes>
      <Route
        path={routes.home.path}
        element={
          <div>
            <h1 className={styles.title_large}>Hello World!</h1>
            <h3 className={styles.title_small}>This is the start page of the project</h3>
          </div>
        }
      />
      <Route path={routes['sign-in'].path} element={<LoginPage />}
      />
      <Route
        path={routes['sign-up'].path}
        element={
          <div>
            <h1>Register Page</h1>
          </div>
        }
      />
      <Route
        path={routes.profile.path}
        element={ <ProfilePage /> }
      />
      
      // Для проверки NavLink в Sidebar и Projects
      <Route
        path={'*'}
        element={ <ProfilePage /> }
      />
    </Routes>
  )
}
