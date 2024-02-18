import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // if not having access token navigate to login
    if (!user?.user?.accessToken) navigate('/login');
  }, [user, navigate]);

  async function handleChange(e) {
    const file = e.target.files[0];
  }

  return (
    <div>
      <Button variant='contained' component='label'>
        Upload File
        <input
          onChange={handleChange}
          hidden
          type='file'
          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        />
      </Button>
    </div>
  );
};

export default Dashboard;
