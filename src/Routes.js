// src/Routes.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { Layout } from './Layout';
import { Alert, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from './store/userSlice';

const RouterConfig = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.error) {
      setTimeout(() => {
        dispatch(setError(''));
      }, 2000);
    }
  }, [user.error, dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<>Not found.</>} />
          <Route path='/' element={<Layout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      {user.error ? <Alert severity='error'>{user.error}</Alert> : ''}
      {user.loading ? <CircularProgress /> : ''}
    </>
  );
};

export default RouterConfig;
