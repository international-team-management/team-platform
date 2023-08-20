import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'src/routes';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { LoginPage } from 'src/pages/LoginPage/LoginPage';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { useDispatch, useSelector } from 'src/services/hooks';
import { authThunks, selectUserMe } from 'src/services/slices/authSlice';
import { KanbanPage } from 'pages/KanbanPage/KanbanPage';
import { TeamPage } from 'src/pages/TeamPage/TeamPage';
import { Sidebar } from '../sidebar/Sidebar';
import { HeaderTemplate } from '../UI/header-template/HeaderTemplate';
import clsx from 'clsx';
import {
  HeaderState,
  selectHeaderState,
} from 'src/services/slices/headerSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const userMe = useSelector(selectUserMe);
  const headerState = useSelector(selectHeaderState);

  // Check if the user is logged in at the level of the app
  React.useEffect(() => {
    if (!userMe) dispatch(authThunks.userMe());
  }, [dispatch, userMe]);

  return (
    <main
      className={clsx('main', {
        ['main_auth']: userMe,
        ['main_kanban']: headerState === HeaderState.KANBAN,
      })}
    >
      {userMe && (
        <>
          <Sidebar />
          <HeaderTemplate />
        </>
      )}
      <Routes>
        {/* free access */}

        {/* instead of the main page, there will be a registration page for now */}
        <Route path={routes['home'].path} element={<SignUpPage />} />

        <Route path={routes['sign-in'].path} element={<LoginPage />} />
        <Route path={routes['sign-up'].path} element={<SignUpPage />} />

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route path={routes['profile'].path} element={<ProfilePage />} />
          <Route path={routes['canban'].path} element={<KanbanPage />} />
          <Route path={routes['team'].path} element={<TeamPage />} />
        </Route>

        {/* 404 */}
        <Route path={'*'} element={<div>Такой страницы не существует</div>} />
      </Routes>
    </main>
  );
};
