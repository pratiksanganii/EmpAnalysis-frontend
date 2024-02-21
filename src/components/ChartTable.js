import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React from 'react';

const ChartTable = () => {
  return (
    <div
      style={{
        margin: '10px',
      }}
    >
      ChartTable
      <Comp
        type={'bar'}
        data={{
          field: 'Skills',
          types: ['ReactJS', 'NodeJS'],
          values: [12, 30],
        }}
      />
    </div>
  );
};

const Comp = ({ type, data }) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <Typography>{data.field}</Typography>
      {type === 'bar' ? (
        <BarChart
          series={[{ data: data.values }]}
          height={300}
          xAxis={[{ data: data.types, scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      ) : (
        ''
      )}
    </div>
  );
};
export default ChartTable;
