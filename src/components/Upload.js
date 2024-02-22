import React from 'react';
import { useDispatch } from 'react-redux';
import { feedDataFromExcel } from '../store/userSlice';
import { Button } from '@mui/material';
import { empList } from '../store/employeeSlice';

const Upload = () => {
  const dispatch = useDispatch();

  async function handleChange(e) {
    const file = e.target.files[0];
    await dispatch(feedDataFromExcel(file));
    dispatch(empList());
  }
  return (
    <Button variant='contained' component='label'>
      Upload File
      <input
        onInput={handleChange}
        hidden
        type='file'
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      />
    </Button>
  );
};

export default Upload;
