import React, { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import Footer from './Common';
import { useDispatch } from 'react-redux';
import { signup } from '../store/userSlice';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [name, setName] = useState('');
  const [fields, setFields] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cPassword !== password)
      setFields({
        ...fields,
        password: 'Password does not match!',
        cPassword: 'Password does not match!',
      });
    if (Object.keys(fields).length) return;
    dispatch(signup({ name, email, password }));
  };
  return (
    <Container component='main' maxWidth='sm' style={{}}>
      <Box
        sx={{
          marginTop: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 7,
          border: '1px solid black',
          borderRadius: '10px',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            name='name'
            label='Full Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            error={fields?.name ? true : false}
            helperText={fields?.name}
          />
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
            error={fields?.email ? true : false}
            helperText={fields?.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
              if (fields.password || fields.cPassword)
                setFields({
                  ...fields,
                  password: undefined,
                  cPassword: undefined,
                });
            }}
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            error={fields?.password ? true : false}
            helperText={fields?.password}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            onChange={(e) => {
              setCPassword(e.target.value);
              if (fields.password || fields.cPassword)
                setFields({
                  ...fields,
                  password: undefined,
                  cPassword: undefined,
                });
            }}
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            value={cPassword}
            error={fields?.cPassword ? true : false}
            helperText={fields?.cPassword}
          />
          <Footer type='signup' />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
