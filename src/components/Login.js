import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Footer from './Common';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, remember }));
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 9,
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
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  value={remember}
                  onChange={(e) => {
                    setRemember(e.target.value);
                  }}
                  color='primary'
                />
              }
              label='Remember me'
            />
          </Grid>
          <Footer type='login' />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
