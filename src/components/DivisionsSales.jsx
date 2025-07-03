/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import Cookies from 'js-cookie';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

import './component.css';

import Swal from 'sweetalert2';
import { Years } from './SelectInput';

const DivisionsSales = () => {
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );
  const [sales, setSales] = useState([
    { TotalNetQty: 0, TotalNetAmount: 0, DivisionName: 'Division' },
  ]);
  const [loading, setLoading] = useState(false);

  const baseurl = `${process.env.REACT_APP_API}/data`;

  useEffect(() => {
    const getSales = async () => {
      try {
        const Url = `${baseurl}/divisions/sales`;
        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          Url,
          { year: selectedYear },
          { headers }
        );

        response.data.length > 0
          ? setSales(response.data)
          : setSales([
              { TotalNetQty: 0, TotalNetAmount: 0, DivisionName: 'Division' },
            ]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
          showCloseButton: true,
          confirmButtonText: 'OK',
        });
      }
    };
    getSales();
  }, [selectedYear]);

  const barChartsParams = {
    series: [
      {
        data: sales.map((sale) => parseInt(sale.TotalNetQty)),
        label: 'NetQty',
      },
      {
        data: sales.map((sale) => parseInt(sale.TotalNetAmount)),
        label: 'NetAmount',
      },
    ],
    xAxis: [
      {
        data: sales.map((sale) => sale.DivisionName),
        scaleType: 'band',
      },
    ],

    height: 300,
    margin: { left: 100, top: 5 },
  };
  const QtyData = sales.map((sale) => parseInt(sale.TotalNetQty));
  const AmountData = sales.map((sale) => parseInt(sale.TotalNetAmount));
  const xLabels = sales.map((sale) => sale.DivisionName);
  const colors = [
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#1f7754',
    '#7fc97f',
    '#beaed4',
    '#fdc086',
    '#ffff99',
    '#386cb0',
    '#f0027f',
    '#bf5b17',
    '#666666',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
  ];

  const TOTAL =
    sales.length > 0
      ? sales.reduce((total, tab) => total + parseFloat(tab.TotalNetAmount), 0)
      : 0;

  const TOTALQty =
    sales.length > 0
      ? sales.reduce((total, tab) => total + parseFloat(tab.TotalNetAmount), 0)
      : 0;

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    const percentage = (percent * 100).toFixed(0);
    return percentage > 2 ? `${percentage}%` : '';
  };

  const getArcLabels = (params) => {
    const percent = params.value / TOTALQty;
    const percentage = (percent * 100).toFixed(0);
    return percentage > 0 ? `${percentage}%` : '';
  };

  const pieChartsParams = {
    series: [
      {
        data: sales.map((sale, i) => ({
          value: sale.TotalNetQty,
          label: `${sale.DivisionName}(NetQty)`,
          color: colors[i],
        })),
        label: 'NetQty',
        outerRadius: 80,
        highlighted: { additionalRadius: 10 },
        arcLabel: getArcLabels,
      },
      {
        data: sales.map((sale, i) => ({
          value: sale.TotalNetAmount,
          label: `${sale.DivisionName}(NetAmount)`,
          color: colors[i],
        })),
        arcLabel: getArcLabel,
        label: 'NetAmount',
        innerRadius: 90,
        highlighted: { additionalRadius: 10 },
      },
    ],

    height: 300,
    margin: { top: 20, bottom: 15 },
  };

  const [chartType, setChartType] = React.useState('bar');
  const [withArea, setWithArea] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState('item');
  const [faded, setFaded] = React.useState('global');

  const handleChartType = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  return (
    <div className='graph-main-container'>
      {loading && (
        <CircularProgress
          color='success'
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            zIndex: 1,
          }}
        />
      )}
      <h3 className='graph-title'>Division Wise Sales</h3>
      <Stack
        direction={{ xs: 'column', xl: 'row' }}
        spacing={1}
        sx={{ width: '100%' }}>
        <Box
          className='container-input'
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '7px',
          }}>
          <Years year={selectedYear} setYear={setSelectedYear} />
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartType}
            aria-label='chart type'
            fullWidth>
            {['bar', 'line', 'pie'].map((type) => (
              <ToggleButton key={type} value={type} aria-label='left aligned'>
                {type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box>
          {chartType === 'bar' && (
            <BarChart
              {...barChartsParams}
              series={barChartsParams.series.map((series) => ({
                ...series,
                highlightScope: {
                  highlighted,
                  faded,
                },
              }))}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 0,
                },
              }}
            />
          )}

          {chartType === 'line' && (
            <LineChart
              height={300}
              series={[
                { data: AmountData, label: 'NetAmount' },
                { data: QtyData, label: 'NetQty' },
              ]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
              margin={{ left: 100, top: 5 }}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 0,
                },
              }}
            />
          )}

          {chartType === 'pie' && (
            <PieChart
              {...pieChartsParams}
              series={pieChartsParams.series.map((series) => ({
                ...series,
                highlightScope: {
                  highlighted,
                  faded,
                },
              }))}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontSize: 15,
                },
              }}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default DivisionsSales;
