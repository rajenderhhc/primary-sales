/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';

import FacebookCircularProgress from './ProgressLoader';
import { SelectOption, Years } from './SelectInput';
import { Months } from '../Utils/Months';
import { handleApiError } from '../Utils/Error';

const xAxis = {
  scaleType: 'band',
  data: Months,
};

export default function StateWiseSales() {
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  );
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [stackOrder, setStackOrder] = useState('appearance');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const baseurl = `${process.env.REACT_APP_API}/data`;

  useEffect(() => {
    const getData = async () => {
      try {
        const brandurl = `${baseurl}/states`;
        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(brandurl, {}, { headers });
        const data = response.data.map((obj) => ({
          code: obj.statecode,
          name: obj.statename,
        }));
        setStates(data);
        setState(response.data[1].statecode);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        handleApiError(e);
      }
    };
    getData();
  }, [baseurl]);

  useEffect(() => {
    const getSales = async () => {
      try {
        const Url = `${baseurl}/state/sales`;
        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(
          Url,
          { state, year: selectedYear },
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
  }, [baseurl, state, selectedYear]);

  const salesData = xAxis.data.map((month, i) => {
    const sale = sales.find((sale) => sale.SaleMonth === i + 4);
    if (sale) {
      return { ...sale, SaleMonth: month };
    } else {
      return {
        SaleMonth: month,
        TotalNetQty: 0,
        TotalSaleAmount: 0,
        TotalReturnAmount: 0,
        TotalNetAmount: 0,
      };
    }
  });

  const series = [
    {
      label: 'SaleAmount',
      data:
        salesData.length > 0
          ? salesData.map((sale) => parseInt(sale.TotalSaleAmount))
          : [0, 0],
      stack: 'total',
      color: '#038cfc',
      stackOrder: 'ascending',
    },
    {
      label: 'ReturnAmount',
      data:
        salesData.length > 0
          ? salesData.map((sale) => parseInt(sale.TotalReturnAmount))
          : [0, 0],
      stack: 'total',
      color: '#fc3503',
    },
    {
      label: 'NetAmount',
      data:
        salesData.length > 0
          ? salesData.map((sale) => parseInt(sale.TotalNetAmount))
          : [0, 0],
      stack: 'total',
      color: '#27f587',
    },
  ];

  const modifiedSeries = [{ ...series[0], stackOrder }, ...series.slice(1)];

  return (
    <Box className='graph-main-container'>
      {loading && <FacebookCircularProgress />}
      <Box className='d-flex flex-column'>
        <h3 className='graph-title'>State wise Sales</h3>
        <div className='w-100 d-flex justify-content-around'>
          <SelectOption
            label={'state'}
            data={states}
            option={state}
            setOption={setState}
          />
          <Years year={selectedYear} setYear={setSelectedYear} />
        </div>
      </Box>

      {sales.length === 0 && !loading ? (
        <div className='text-danger align-self-center my-5'>
          <h2>No Records Found</h2>
        </div>
      ) : (
        <BarChart
          height={370}
          xAxis={[
            {
              ...xAxis,
              tickLabelStyle: {
                angle: 315,
                dominantBaseline: 'hanging',
                textAnchor: 'end',
              },
              labelStyle: {
                transform: 'translateY(15px)',
              },
            },
          ]}
          yAxis={[
            {
              min: 0, // You can adjust the min and max values based on your data
              max: Math.max(...series.map((s) => Math.max(...s.data))) + 100000,
            },
          ]}
          series={modifiedSeries}
          margin={{ top: isMobile ? 100 : 50, bottom: 70, left: 80 }}
        />
      )}
    </Box>
  );
}
