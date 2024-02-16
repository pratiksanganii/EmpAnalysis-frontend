import { Button, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ type }) => {
  return (
    <Grid container marginLeft={'140px'}>
      <Grid item xs={3}>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          Sign {type === 'login' ? 'In' : 'Up'}
        </Button>
      </Grid>
      <Grid item>
        <Link to={`/${type === 'login' ? 'signup' : 'login'}`}>
          <Button variant='outlined' sx={{ mt: 3, mb: 2 }}>
            Sign {type === 'login' ? 'Up' : 'In'} Instead
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
