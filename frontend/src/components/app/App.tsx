import React from 'react';

import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'src/routes';
import { LoginPage } from 'src/pages/LoginPage/LoginPage';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { KanbanPage } from 'pages/KanbanPage/KanbanPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={routes.home.path} element={<KanbanPage />} />
      <Route path={routes['sign-in'].path} element={<LoginPage />} />
      <Route path={routes['sign-up'].path} element={<SignUpPage />} />
      <Route path={routes.profile.path} element={<ProfilePage />} />
      // Для проверки NavLink в Sidebar и Projects
      <Route path={'*'} element={<ProfilePage />} />
    </Routes>
  );
};
