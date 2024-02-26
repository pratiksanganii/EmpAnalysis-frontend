import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';
import EmpTable from './EmpTable';
import { empList } from '../store/employeeSlice';
import PopUp from './PopUp';
import ChartTable from './chart/ChartTable';
import { Button, CircularProgress } from '@mui/material';
import { logout } from '../store/userSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.user)?.user;
  const emp = useSelector((state) => state.emp);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // if not having access token navigate to login
    if (!user?.accessToken) navigate('/login');
    dispatch(empList());
  }, [user, navigate, dispatch]);

  return (
    <div>
      {emp.loading ? <CircularProgress /> : ''}
      <div
        style={{ display: 'flex', width: '100vw', justifyContent: 'flex-end' }}
      >
        <Button
          style={{ backgroundColor: '#ff4e60', marginRight: '100px' }}
          variant='contained'
          onClick={() => dispatch(logout())}
          component='label'
        >
          Logout
        </Button>
      </div>
      {!emp?.data?.length && !emp.loading ? <Upload /> : ''}
      <div>
        <EmpTable setData={setData} setVisible={setVisible} />
        <ChartTable />
      </div>
      {visible ? (
        <PopUp data={data} visible={visible} setVisible={setVisible} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Dashboard;
