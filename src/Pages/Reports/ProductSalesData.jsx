/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Header from '../../components/Header';
import Form from '../../components/Form';

import { LoaderOpen, LoaderClose } from '../../Utils/Swalhandler/LoaderHandler';
import { handleApiError } from '../../Utils/Swalhandler/Error';
import { useFormState } from '../../Context/FormContenxt';

import './pages.css';
import BarGraph from './BarGraph';
import DataTable from './DataTable';

const ProductSalesData = () => {
  const [products, setProductData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const profileDetails = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_USER_KEY)
  );
  const { saleAccess } = profileDetails;
  const baseUrl = `${process.env.REACT_APP_API}`;
  const { selectedDivision, selectedHq, divisions, toDate, hqs } =
    useFormState();

  // Parse the year and month from the string
  const year = parseInt(toDate.split('-')[0], 10);
  const currentMonthIndex = parseInt(toDate.split('-')[1], 10) - 1; // Subtract 1 because JavaScript months are 0-based

  // Create date objects
  const currentMonthDate = new Date(year, currentMonthIndex);
  const previousMonthDate = new Date(year, currentMonthIndex - 1);

  // Format the months as strings
  const currentMonth = currentMonthDate.toLocaleString('default', {
    month: 'long',
  });
  const previousMonth = previousMonthDate.toLocaleString('default', {
    month: 'long',
  });

  const headers = [
    'Product Name',
    'Sales Volume (Qty)',
    `${previousMonth} Revenue (INR)`,
    `${currentMonth} Revenue (INR)`,
    'Growth Rate of Revenue',
    'Sales Trend',
  ];

  const getReports = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/data/productwise`;
      const jwtToken = Cookies.get(process.env.REACT_APP_TOKEN);

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      };
      LoaderOpen(
        'We are currently searching for the information you requested. Please wait.'
      );

      // Find division code if selectedDivision is not empty
      const { DivisionCode, DivisionName, SaleHQCodes } = saleAccess[0];
      const divisionCode = selectedDivision
        ? divisions.find((div) => div.id === selectedDivision)
        : {
            id: DivisionCode,
            name: DivisionName,
          };

      // Determine HQ codes
      let hqCode = [];
      if (selectedHq.length > 0) {
        hqCode = selectedHq;
      } else {
        // Check if SaleHQCodes is 'all' and handle accordingly
        if (SaleHQCodes.toLowerCase() === 'all') {
          hqCode = hqs;
        } else {
          hqCode = [{ id: SaleHQCodes, name: '' }];
        }
      }

      // Create request body
      const body = {
        selectedMonth: toDate,
        divisionCode,
        hqCode,
      };

      // Make API request
      const response = await axios.post(url, body, { headers });
      LoaderClose();
      setProductData(response.data);
      setShowResult(true);
    } catch (error) {
      setShowResult(false);
      LoaderClose();
      handleApiError(error);
    }
  };

  const handleDownloadExcel = () => {
    const exportButton = document.getElementById('export-excel-btn');
    if (exportButton) {
      exportButton.click();
    } else {
      console.error('Element with id "export-excel-btn" not found');
    }
  };

  return (
    <>
      <Header />
      <Form
        handleSubmit={getReports}
        handleDownloadExcel={handleDownloadExcel}
        salesData={products}
        handleGraphView={setShowTable}
        showTable={showTable}
      />
      <>
        <ReactHTMLTableToExcel
          id='export-excel-btn'
          className='d-none'
          table='reports-data-table'
          filename='ProductValues'
          sheet='ProductValuesdata'
          buttonText='Download as XLS'
        />
        <div className='d-none'>
          <DataTable headers={headers} salesData={products} />
        </div>
        {showResult ? (
          products.length > 0 ? (
            <>
              {showTable ? (
                <div className='data-table-container'>
                  <DataTable headers={headers} salesData={products} />
                </div>
              ) : (
                <div className='data-graph-container'>
                  <BarGraph salesData={products} />
                </div>
              )}
            </>
          ) : (
            <div className='w-100 d-flex justify-content-center align-items-center fs-3'>
              <h3 style={{ color: 'red' }}>No Result Found</h3>
            </div>
          )
        ) : null}
      </>
    </>
  );
};

export default ProductSalesData;
