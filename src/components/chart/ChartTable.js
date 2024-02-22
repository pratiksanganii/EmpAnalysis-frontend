import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import PopUp from './PopUp';

const ChartTable = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        style={{
          margin: '10px',
          width: '90vw',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography>Charts</Typography>
        <Button
          onClick={() => setVisible(true)}
          variant='contained'
          component='label'
        >
          Create
        </Button>
      </div>
      <PopUp visible={visible} setVisible={setVisible} />
    </>
  );
};
export default ChartTable;
