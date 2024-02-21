import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const Layout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if having access token navigate to dashboard
    if (!['/login', '/signup'].includes(location.pathname))
      if (user.user?.accessToken) navigate('/dashboard');
      else navigate('/login');
  }, [user, navigate, location.pathname]);
  return <Outlet />;
};
