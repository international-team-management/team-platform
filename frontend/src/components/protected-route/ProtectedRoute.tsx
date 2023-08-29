import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'src/services/hooks';
import { selectUserMe } from 'src/services/slices/authSlice';
import { routes } from 'src/routes';

export const ProtectedRoute: React.FC = () => {
  const userMe = useSelector(selectUserMe);

  return userMe === undefined ? (
    <></>
  ) : userMe ? (
    <Outlet />
  ) : (
    <Navigate to={routes['sign-in'].path} replace />
  );
};
