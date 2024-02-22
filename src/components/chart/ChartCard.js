import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

export const ChartCard = ({ type, data }) => {
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
