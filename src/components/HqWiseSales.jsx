/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material';

import FacebookCircularProgress from './ProgressLoader';
import { SelectOption, Years } from './SelectInput';
import { colors } from '../Utils/Colors';
import { Months } from '../Utils/Months';

import './component.css';
import { handleApiError } from '../Utils/Error';

const HqWiseSales = () => {
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );
  const [selectedHq, setHq] = useState('');
  const [hqData, setHqData] = useState([]);
  const [sales, setSales] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const [chartType, setChartType] = React.useState('bar');

  const isMobile = useMediaQuery('(max-width: 768px)');

  const baseurl = `${process.env.REACT_APP_API}/data`;

  useEffect(() => {
    const getData = async () => {
      try {
        const brandurl = `${baseurl}/hqs`;

        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.get(brandurl, { headers });
        const data = response.data.map((obj) => ({
          code: obj.HQCode,
          name: obj.HQName,
        }));
        setHqData(data);
        setHq(data[0].code);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        handleApiError(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getSales = async () => {
      try {
        const Url = `${baseurl}/hq/sales`;
        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          Url,
          { selectedHq, year: selectedYear },
          { headers }
        );

        setSales(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApiError(error);
      }
    };
    getSales();
  }, [selectedHq, selectedYear]);

  const salesData = Months.map((month, i) => {
    const sale = sales.find((sale) => sale.MonthName === i + 4);
    if (sale) {
      return { ...sale, MonthName: month };
    } else {
      return {
        MonthName: month,
        TotalNetAmount: 0,
      };
    }
  });

  const handleChartType = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const TOTAL =
    sales.length > 0
      ? sales.reduce((total, tab) => total + parseFloat(tab.TotalNetAmount), 0)
      : 0;

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    const percentage = (percent * 100).toFixed(0);
    const result = params.show
      ? `${percentage}%`
      : percentage > 2
      ? `${percentage}%`
      : '';
    return result;
  };

  return (
    <div className='graph-main-container'>
      {loading && <FacebookCircularProgress />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <h3 className='graph-title m-0'>Hq Wise Sales NetAmount</h3>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isMobile ? 2 : 0,
          }}>
          <SelectOption
            label={'Hq'}
            data={hqData}
            option={selectedHq}
            setOption={setHq}
          />
          <Years year={selectedYear} setYear={setSelectedYear} />
        </Box>
      </Box>
      <Stack
        direction={{ xs: 'column', xl: 'row' }}
        spacing={1}
        sx={{ width: '100%' }}>
        <Box>
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
        {sales.length === 0 && !loading ? (
          <div className='text-danger align-self-center my-5'>
            <h2>No Records Found</h2>
          </div>
        ) : (
          <Box>
            {chartType === 'bar' && (
              <BarChart
                height={350}
                margin={{ left: 100, bottom: 80 }}
                slotProps={{
                  legend: { hidden: true },
                }}
                series={[
                  {
                    data: salesData.map((hq) => hq.TotalNetAmount),
                    label: 'NetAmount ₹',
                    id: 'pvId',
                  },
                ]}
                xAxis={[
                  {
                    data: salesData.map((hq) => hq.MonthName),
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
            )}

            {chartType === 'line' && (
              <LineChart
                height={350}
                series={[
                  {
                    data: salesData.map((sale) =>
                      parseInt(sale.TotalNetAmount)
                    ),
                    label: 'NetAmount ₹',
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: Months,
                    tickLabelStyle: {
                      angle: 325,
                      dominantBaseline: 'hanging',
                      textAnchor: 'end',
                    },
                    labelStyle: {
                      transform: 'translateY(15px)',
                    },
                  },
                ]}
                animate={{
                  onLoad: { duration: 3000 }, // Optional: animation when the chart initially loads
                }}
                margin={{ left: 80, bottom: 75 }}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
              />
            )}

            {chartType === 'pie' && (
              <PieChart
                series={[
                  {
                    data: salesData.map((tab, i) => ({
                      id: i,
                      value: tab.TotalNetAmount,
                      label: `${tab.MonthName} - ${getArcLabel({
                        value: tab.TotalNetAmount,
                        show: true,
                      })}`,
                      color: colors[i],
                    })),
                    paddingAngle: 0.5,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -0,
                      color: 'gray',
                    },
                    cx: isMobile ? 165 : 290,
                    arcLabel: getArcLabel,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 15,
                  },
                }}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    itemMarkWidth: 10,
                    itemMarkHeight: 10,
                    itemGap: 2,
                  },
                }}
                margin={{
                  top: isMobile ? -70 : 10,
                  bottom: isMobile ? 50 : 100,
                  left: 1,
                  right: 100,
                }}
                height={isMobile ? 420 : 350}
              />
            )}
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default HqWiseSales;
