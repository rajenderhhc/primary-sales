import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const BarGraph = (props) => {
  const { salesData } = props;

  return (
    <>
      <BarChart
        height={700}
        width={salesData.length > 25 ? salesData.length * 50 : 1250}
        margin={{ left: 100, bottom: 250 }}
        series={[
          {
            data: salesData.map((item) => item.PreviousMonthRevenue),
            label: 'PreviousMonthRevenue ₹',
            id: 'prevsale',
          },
          {
            data: salesData.map((item) => item.CurrentMonthRevenue),
            label: 'CurrentMonthRevenue ₹',
            id: 'currentsale',
            color: '#34aeeb',
          },
        ]}
        xAxis={[
          {
            data: salesData.map(
              (item) => item.MaterialName ?? item.CustomerName
            ),
            scaleType: 'band',
            tickLabelStyle: {
              angle: 320,
              dominantBaseline: 'hanging',
              textAnchor: 'end',
            },
            labelStyle: {
              transform: 'translateY(15px)',
            },
          },
          { min: 10, max: 50, scaleType: 'linear' },
        ]}
      />
    </>
  );
};

export default BarGraph;
