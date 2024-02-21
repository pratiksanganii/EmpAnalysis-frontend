import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';
import EmpTable from './EmpTable';
import { empList } from '../store/employeeSlice';
import { Button } from '@mui/material';
import PopUp from './PopUp';
import ChartTable from './ChartTable';

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
  }, [user, navigate]);

  return (
    <div>
      {!emp?.data?.length ? <Upload /> : ''}
      <div>
        <div
          style={{
            width: '90vw',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={() => setVisible(true)}
            variant='contained'
            component='label'
          >
            Create
          </Button>
        </div>
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