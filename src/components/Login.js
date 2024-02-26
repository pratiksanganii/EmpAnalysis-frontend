import { Box, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Footer from './Common';
import { useDispatch } from 'react-redux';
import { login, setLoading } from '../store/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(login({ email, password }));
  };

  return (
    <div
      style={{
        margin: 'auto',
      }}
    >
      <Container component='main' maxWidth='sm'>
        <Box
          sx={{
            margin: 'auto',
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 7,
            border: '1px solid black',
            borderRadius: '10px',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              autoComplete='current-password'
            />
            <Footer type='login' />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
