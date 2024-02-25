import { Typography } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

export const ChartCard = ({ data }) => {
  return (
    <div style={{ border: '1px solid black', margin: 'auto' }}>
      <Typography>{data.field}</Typography>
      {data?.types?.length ? (
        data.type === 1 ? (
          <BarChart
            series={[{ data: data.values }]}
            height={300}
            xAxis={[{ data: data.types, scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        ) : data.type === 2 ? (
          <LineChart
            series={[{ data: data.values }]}
            xAxis={[{ data: data.types }]}
            height={300}
          />
        ) : data.type === 3 ? (
          <PieChart
            series={[
              {
                data: data?.types?.map((d, id) => ({
                  id,
                  value: data.values[id],
                  label: d,
                })),
              },
            ]}
            height={300}
          />
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  );
};
