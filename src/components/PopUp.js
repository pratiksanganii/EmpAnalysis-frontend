import {
  Box,
  Button,
  Container,
  Modal,
  Select,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { create, update } from '../store/employeeSlice';
import http from '../http-common';
import { logout } from '../store/userSlice';

const PopUp = ({ data, visible, setVisible }) => {
  const [employeeID, setEmployeeID] = useState(data?.employeeID);
  const [employeeName, setEmployeeName] = useState(data?.employeeName);
  const [employeeStatus, setEmployeeStatus] = useState(data?.employeeStatus);
  const [joiningDate, setJoiningDate] = useState(data?.joiningDate);
  const [birthDate, setBirthDate] = useState(data?.birthDate);
  const [skills, setSkills] = useState(data?.skills);
  const [salary, setSalary] = useState(data?.salaryDetails);
  const [address, setAddress] = useState(data?.address);
  const [designation, setDesignation] = useState(data?.designation);
  const [statusList, setStatusList] = useState([]);
  const [desigList, setDesigList] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const payload = {
      employeeID,
      employeeName,
      employeeStatus,
      designation,
      joiningDate,
      birthDate,
      skills,
      salary,
      address,
    };
    if (data?.id) dispatch(update({ id: data.id, ...payload }));
    else dispatch(create(payload));
    setVisible(false);
  };

  useEffect(() => {
    const setEmpData = async () => {
      try {
        const emp = await http.get('/misc/empData');
        setStatusList(emp.data.status);
        setDesigList(emp.data.designation);
      } catch (e) {
        if (e.response.status === 403) dispatch(logout());
      }
    };
    setEmpData();
  }, [dispatch]);

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{}}
    >
      <Container maxWidth='sm' style={{ background: 'white' }}>
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 7,
            borderRadius: '10px',
            maxHeight: '50vh',
            overflow: 'scroll',
          }}
        >
          <Button
            style={{
              position: 'absolute',
              marginLeft: '500px',
              marginTop: '-25px',
            }}
            onClick={() => setVisible(false)}
          >
            x
          </Button>
          <Typography component='h1' variant='h5'>
            {data ? 'Update Employee' : 'Add Employee'}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='id'
            name='id'
            label='Employee id'
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='empName'
            name='empName'
            label='Employee name'
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <Select
            margin='normal'
            fullWidth
            required
            value={employeeStatus}
            label='Status'
            name='Status'
            onChange={(e) => setEmployeeStatus(e.target.value)}
          >
            {statusList.map((s) => (
              <MenuItem value={s}>{s}</MenuItem>
            ))}
          </Select>
          <Select
            margin='normal'
            fullWidth
            required
            value={designation}
            label='Designation'
            name='Designation'
            onChange={(e) => setDesignation(e.target.value)}
          >
            {desigList.map((s) => (
              <MenuItem value={s}>{s}</MenuItem>
            ))}
          </Select>
          <TextField
            margin='normal'
            required
            type='date'
            fullWidth
            id='joiningDate'
            name='joiningDate'
            label='Joining Date'
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
          <TextField
            margin='normal'
            type='date'
            required
            fullWidth
            id='birthDate'
            name='birthDate'
            label='Birth Date'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='skills'
            name='skills'
            label='Skills (comma separated values)'
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='salary'
            name='salary'
            label='salary'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='address'
            name='address'
            label='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>
        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{ mt: 3, mb: 2, ml: 50 }}
        >
          {data ? 'Update' : 'Create'}
        </Button>
      </Container>
    </Modal>
  );
};

export default PopUp;
