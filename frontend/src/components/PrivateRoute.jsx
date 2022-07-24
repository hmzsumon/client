import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  return (
    <>{!isLoading && isAuthenticated ? <Outlet /> : <Navigate to='/login' />}</>
  );
};

export default PrivateRoute;
