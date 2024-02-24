import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PopUp from './PopUp';
import { ChartCard } from './ChartCard';
import { useDispatch, useSelector } from 'react-redux';
import { listChart } from '../../store/chartSlice';

const ChartTable = () => {
  const [visible, setVisible] = useState(false);
  const chart = useSelector((state) => state.chart);
  const data = chart.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listChart());
  }, [dispatch]);

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
      <Container>
        {data.map((d) => {
          return <ChartCard key={d.id} data={d} />;
        })}
      </Container>
      <PopUp visible={visible} setVisible={setVisible} />
    </>
  );
};
export default ChartTable;
