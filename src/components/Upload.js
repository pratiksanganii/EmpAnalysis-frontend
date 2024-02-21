import React from 'react';
import { useDispatch } from 'react-redux';
import { feedDataFromExcel } from '../store/userSlice';
import { Button } from '@mui/material';

const Upload = () => {
  const dispatch = useDispatch();

  async function handleChange(e) {
    const file = e.target.files[0];
    dispatch(feedDataFromExcel(file));
  }
  return (
    <Button variant='contained' component='label'>
      Upload File
      <input
        onChange={handleChange}
        hidden
        type='file'
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      />
    </Button>
  );
};

export default Upload;
