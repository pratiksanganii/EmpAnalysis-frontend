// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { Layout } from './Layout';

const RouterConfig = () => {
  return (
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
  );
};

export default RouterConfig;
