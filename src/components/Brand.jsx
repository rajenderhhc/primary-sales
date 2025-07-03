import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import { LineChart } from '@mui/x-charts/LineChart';

import { SelectOption, Years } from './SelectInput';
import { Months } from '../Utils/Months';

import { handleApiError } from '../Utils/Error';

const Brand = () => {
  const [brands, setBands] = useState([]);
  const [sales, setSales] = useState([]);
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [loading, setLoading] = useState(false);

  const baseurl = `${process.env.REACT_APP_API}/data`;

  useEffect(() => {
    const getData = async () => {
      try {
        const brandurl = `${baseurl}/brands`;
        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const brandResponse = await axios.get(brandurl, { headers });
        const data = brandResponse.data.map((obj) => ({
          code: obj.BrandCode,
          name: obj.BrandName,
        }));
        setBands(data);
        setBrand(brandResponse.data[0].BrandCode);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        handleApiError(e);
      }
    };
    getData();
  }, [baseurl]);

  useEffect(() => {
    const brandData = async () => {
      try {
        const Url = `${baseurl}/brand/sales`;
        const jwtToken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        setLoading(true);
        const response = await axios.post(Url, { brand, year }, { headers });
        setSales(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApiError(error);
      }
    };
    brandData();
  }, [baseurl, brand, year]);

  const salesData = Months.map((month, i) => {
    const sale = sales.find((sale) => sale.monthName === i + 4);
    if (sale) {
      return { ...sale, monthName: month };
    } else {
      return {
        monthName: month,
        TotalSaleQty: 0,
        TotalReturnQty: 0,
        TotalFreeQty: 0,
      };
    }
  });

  return (
    <div className='graph-main-container'>
      {loading && (
        <CircularProgress
          color='primary'
          sx={{ position: 'absolute', top: '40%', left: '50%' }}
        />
      )}
      <div className='d-flex flex-column'>
        <h3 className='graph-title'>Brand wise Sales</h3>
        <div className='w-100 d-flex justify-content-around'>
          <SelectOption
            label={'Brand'}
            data={brands}
            option={brand}
            setOption={setBrand}
          />
          <Years year={year} setYear={setYear} />
        </div>
        {sales.length === 0 && !loading ? (
          <div className='text-danger align-self-center my-5'>
            <h2>No Records Found</h2>
          </div>
        ) : (
          <LineChart
            height={380}
            margin={{ bottom: 70, top: 70 }}
            series={[
              {
                data: salesData.map((sale) => sale.TotalSaleQty),
                label: 'SaleQty',
              },
              {
                data: salesData.map((sale) => sale.TotalFreeQty),
                label: 'FreeQty',
                color: '#edc949',
              },
              {
                data: salesData.map((sale) => sale.TotalReturnQty),
                label: 'ReturnQty',
                color: '#e15759',
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
          />
        )}
      </div>
    </div>
  );
};

export default Brand;
