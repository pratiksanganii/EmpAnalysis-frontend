import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // if having access token navigate to dashboard
    if (user.user?.accessToken) navigate('/dashboard');
  }, [user, navigate]);
  return <Outlet />;
};
