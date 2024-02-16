import React, { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import Footer from './Common';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
          />
          <TextField
            margin='normal'
            required
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            value={password}
          />
          <Footer type='signup' />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
