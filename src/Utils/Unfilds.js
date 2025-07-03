// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import moment from 'moment';

// import Cookies from 'js-cookie';
// import axios from 'axios';

// import './dashboard.css';

// import TablePagination from '@mui/material/TablePagination';

// import Header from '../../components/Header';
// import { DropDown, MultiDropdown } from '../../components/DropDown';
// import { showToast } from '../../Utils/Swalhandler/ToastError';
// import { LoaderOpen, LoaderClose } from '../../Utils/Swalhandler/LoaderHandler';
// import { handleApiError } from '../../Utils/Swalhandler/Error';

// import { fetchUpdateTime, fetchDivisions, fetchHqs } from './dashboardFun';
// //import { UserState } from '../../Context/UserContext';

// var fileDownload = require('js-file-download');

// // const Dashboard = () => {
// //   document.title = 'PrimarySales | Dashboard';

// //   const { userDetails, saleAccess } = Userstate();

// //   const [fromDate, setFromDate] = useState('');
// //   const [toDate, setToDate] = useState('');
// //   const [showResult, setshowResult] = useState(false);
// //   const [salesData, setData] = useState([]);
// //   const [records, setRecords] = useState(0);
// //   const [updateTime, setUpdateTime] = useState('');

// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(50);

// //   const [divisions, setDivisions] = useState([]);
// //   const [hqs, setHqs] = useState([]);

// //   const [selectedDivision, setSelectedDivision] = useState('');
// //   const [selectedHq, setSelectedHq] = useState('');

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //     getReports(event, newPage + 1);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(+event.target.value);
// //     setPage(0);
// //     getReports(event, 1, +event.target.value);
// //   };

// //   const handleSubmit = (e) => {
// //     setPage(0);
// //     getReports(e, 1);
// //   };
// //   const baseUrl = `${process.env.REACT_APP_API}/sales`;

// //   useEffect(() => {
// //     fetchUpdateTime().then((time) => {
// //       setUpdateTime(time);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     const Divisions = saleAccess.map((Div) => ({
// //       id: Div.DivisionCode,
// //       name: Div.DivisionName,
// //     }));
// //     // Check if saleAccess is empty or the first division code is 'All'
// //     if (Divisions.length === 1 || Divisions[0]?.DivisionCode === 'All') {
// //       const divisionCode = saleAccess[0].DivisionCode ?? '';
// //       // Fetch divisions based on the first division code
// //       fetchDivisions(divisionCode).then((data) => {
// //         setDivisions(data);
// //       });
// //     } else {
// //       setDivisions(Divisions);
// //     }
// //   }, [saleAccess]);

// //   useEffect(() => {
// //     setSelectedHq([]);
// //     let Division = '';
// //     let HQCodes = '';
// //     if (saleAccess.length === 1) {
// //       Division = saleAccess[0].DivisionCode;
// //       HQCodes = saleAccess[0]?.SaleHQCodes ?? '';
// //     } else {
// //       Division = selectedDivision;
// //       HQCodes = saleAccess.find(
// //         (Div) => Div.DivisionCode === selectedDivision
// //       ).SaleHQCodes;
// //     }
// //     console.log('permision', saleAccess);
// //     console.log(Division, HQCodes);
// //     fetchHqs(Division, HQCodes).then((data) => {
// //       setHqs(data);
// //     });
// //   }, [selectedDivision, saleAccess]);

// //   const getReports = useCallback(
// //     async (e, pageNumber, limit) => {
// //       e.preventDefault();

// //       if (fromDate === '' || toDate === '') {
// //         showToast('Please select a date');
// //         return;
// //       }

// //       try {
// //         const limitofRecords = limit ? limit : rowsPerPage;
// //         const url = `${baseUrl}?page=${
// //           pageNumber ?? 1
// //         }&&limit=${limitofRecords}`;

// //         // zmCode: selectedZone,
// //         //rmCode: selectedRegion,
// //         const divisionCode =
// //           selectedDivision !== ''
// //             ? divisions.filter((div) => div.id === selectedDivision)
// //             : '';
// //         const body = {
// //           fromDate: moment(fromDate).format('DD-MM-YYYY'),
// //           toDate: moment(toDate).format('DD-MM-YYYY'),
// //           divisionCode: selectedDivision,
// //           hqCode: selectedHq,
// //         };

// //         const jwtToken = Cookies.get('sales-token');

// //         const headers = {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${jwtToken}`,
// //         };
// //         LoaderOpen(
// //           'We are currently searching for the information you requested. Please wait.'
// //         );

// //         const response = await axios.post(url, body, { headers });

// //         if (response.status === 200) {
// //           LoaderClose();
// //           setshowResult(true);
// //           setRecords(response.data.totalRecords);
// //           setData(response.data.data);
// //         } else {
// //           LoaderClose();
// //           handleApiError(response);
// //         }
// //       } catch (err) {
// //         LoaderClose();
// //         handleApiError(err);
// //       }
// //     },
// //     [
// //       baseUrl,
// //       fromDate,
// //       toDate,
// //       rowsPerPage,
// //       selectedDivision,
// //       selectedHq,
// //       divisions,
// //     ]
// //   );

// //   const handleDownloadExcel = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const durl = `${baseUrl}/downloadreports`;

// //       const jwtToken = Cookies.get('sales-token');

// //       // zmCode: selectedZone,
// //       // rmCode: selectedRegion,
// //       const body = {
// //         fromDate: moment(fromDate).format('DD-MM-YYYY'),
// //         toDate: moment(toDate).format('DD-MM-YYYY'),
// //         divisionCode: selectedDivision,

// //         hqCode: selectedHq,
// //       };

// //       const headers = {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${jwtToken}`,
// //       };
// //       LoaderOpen('Please wait', 'Downloading .....');
// //       // Send a POST request to the API to download the Excel file
// //       const response = await axios.post(durl, body, {
// //         responseType: 'arraybuffer',
// //         headers,
// //       });

// //       if (response.status === 200) {
// //         LoaderClose();
// //         fileDownload(response.data, 'sales.xlsx');
// //       }
// //     } catch (err) {
// //       LoaderClose();
// //       handleApiError(err);
// //     }
// //   };

// //   // Table Header  Columns and Name

// //   const header = [
// //     // 's.No',
// //     'InvoiceNo',
// //     'InvoiceDate',
// //     'PlantCode',
// //     'PlantName',
// //     'HQName',
// //     'DivisionName',
// //     'CustomerName',
// //     'CustomerCity',
// //     'StateName',
// //     'MaterialCode',
// //     'MaterialName',
// //     'BrandName',
// //     'TherapeuticName',
// //     'SaleQty',
// //     'SaleAmount',
// //     'FreeQty',
// //     'ReturnQty',
// //     'ReturnAmount',
// //     'NetQty',
// //     'NetAmount',
// //     'TaxAmount',
// //     'TotalAmount',
// //     'AMName',
// //     'RMName',
// //     'DMName',
// //     'ZMName',
// //   ];

// //   // Table Row Values
// //   const MemoizedTableRow = useMemo(() => {
// //     return salesData.map((report, index) => (
// //       <tr key={index} className='body-content'>
// //         <td>{report.InvoiceNo}</td>
// //         <td>{report.InvoiceDate}</td>
// //         <td>{report.PlantCode}</td>
// //         <td>{report.PlantName}</td>
// //         <td>{report.HQName}</td>
// //         <td>{report.DivisionName}</td>
// //         <td>{report.CustomerName}</td>
// //         <td>{report.CustomerCity}</td>
// //         <td>{report.StateName}</td>
// //         <td>{report.MaterialCode}</td>
// //         <td>{report.MaterialName}</td>
// //         <td>{report.BrandName}</td>
// //         <td>{report.TherapeuticName}</td>
// //         <td>{report.SaleQty}</td>
// //         <td>{report.SaleAmount}</td>
// //         <td>
// //           {report.FreeQty.includes('-')
// //             ? `-${report.FreeQty.replace('-', '')}`
// //             : report.FreeQty}
// //         </td>
// //         <td>
// //           {report.ReturnQty.includes('-')
// //             ? `-${report.ReturnQty.replace('-', '')}`
// //             : report.ReturnQty}
// //         </td>
// //         <td>
// //           {report.ReturnAmount.includes('-')
// //             ? `-${report.ReturnAmount.replace('-', '')}`
// //             : report.ReturnAmount}
// //         </td>
// //         <td>
// //           {report.NetQty.includes('-')
// //             ? `-${report.NetQty.replace('-', '')}`
// //             : report.NetQty}
// //         </td>
// //         <td>
// //           {report.NetAmount.includes('-')
// //             ? `-${report.NetAmount.replace('-', '')}`
// //             : report.NetAmount}
// //         </td>
// //         <td>
// //           {report.TaxAmount.includes('-')
// //             ? `-${report.TaxAmount.replace('-', '')}`
// //             : report.TaxAmount}
// //         </td>
// //         <td>
// //           {report.TotalAmount.includes('-')
// //             ? `-${report.TotalAmount.replace('-', '')}`
// //             : report.TotalAmount}
// //         </td>
// //         <td>{report.AMName}</td>
// //         <td>{report.RMName}</td>
// //         <td>{report.DMName}</td>
// //         <td>{report.ZMName}</td>
// //       </tr>
// //     ));
// //   }, [salesData]);

// //   const maxDate = new Date(fromDate); // Create a new Date object from fromDate
// //   maxDate.setMonth(maxDate.getMonth() + 2);

// //   return (
// //     <div style={{ height: '100vh' }}>
// //       <Header />
// //       <p className='m-3 text-primary d-inline'>
// //         Data Available UpTo: {updateTime}
// //       </p>
// //       <div className='container-fluid mt-1'>
// //         <div className='card  inputs-container'>
// //           <div className='card-body px-3 pb-2 pt-0'>
// //             <form className='row'>
// //               <div className='col-6 col-md-2 pe-3 my-2'>
// //                 <label htmlFor='fromDate' className='form-label'>
// //                   From Date
// //                 </label>
// //                 <input
// //                   type='date'
// //                   className='form-control'
// //                   id='fromDate'
// //                   value={fromDate}
// //                   onChange={(e) => setFromDate(e.target.value)}
// //                   required={true}
// //                   format='DD-MM-YYYY'
// //                   min={'2024-04-01'}
// //                   max={toDate}
// //                 />
// //               </div>
// //               <div className='col-6 col-md-2 pe-3 my-2'>
// //                 <label htmlFor='inputPassword4' className='form-label'>
// //                   To date
// //                 </label>
// //                 <input
// //                   type='date'
// //                   className='form-control'
// //                   id='fromDate'
// //                   value={toDate}
// //                   required={true}
// //                   onChange={(e) => setToDate(e.target.value)}
// //                   format='DD-MM-YYYY'
// //                   min={fromDate}
// //                 />
// //               </div>
// //               {saleAccess.length > 1 && (
// //                 <DropDown
// //                   label={'Division'}
// //                   data={divisions}
// //                   selectedValue={selectedDivision}
// //                   onChangeHandle={setSelectedDivision}
// //                 />
// //               )}
// //               {/* <DropDown
// //                 label={'Zone'}
// //                 data={zone}
// //                 selectedValue={selectedZone}
// //                 onChangeHandle={setSelectedZone}
// //               />
// //               <DropDown
// //                 label={'Region'}
// //                 data={region}
// //                 selectedValue={selectedRegion}
// //                 onChangeHandle={setSelectedRegion}
// //               /> */}
// //               {saleAccess.length > 1 && (
// //                 <MultiDropdown
// //                   label={'Head Quarters'}
// //                   data={hqs}
// //                   selectedValue={selectedHq}
// //                   onChangeHandle={setSelectedHq}
// //                 />
// //               )}
// //               <div className='col-12 d-flex justify-content-center align-items-center'>
// //                 <button
// //                   className='btn download_btn me-2'
// //                   onClick={handleSubmit}>
// //                   Search
// //                 </button>
// //                 <button
// //                   disabled={salesData.length <= 0}
// //                   onClick={handleDownloadExcel}
// //                   className='btn download_btn'>
// //                   Download Sheet
// //                   <img src='../../download.svg' alt='hetero' className='m-1' />
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //       <div className='result-count-container'>
// //         {showResult ? (
// //           <div className='row w-100 d-flex mt-1 mt-md-0 mx-3'>
// //             <span className='results-text col-12 col-md-6 align-self-center'>
// //               Total Records - {records}
// //             </span>
// //             <TablePagination
// //               className='col-12 col-md-6 pagination-container'
// //               rowsPerPageOptions={[50, 100, 500]}
// //               component='div'
// //               count={records}
// //               rowsPerPage={rowsPerPage}
// //               page={page}
// //               onPageChange={handleChangePage}
// //               onRowsPerPageChange={handleChangeRowsPerPage}
// //             />
// //           </div>
// //         ) : null}
// //       </div>

// //       {showResult ? (
// //         <div className='mx-3 mb-2  d-flex flex-column'>
// //           {salesData.length === 0 ? (
// //             <div className='d-flex align-items-center justify-content-center mt-5 p-5'>
// //               <h3 style={{ color: 'red' }}>No Result Found</h3>
// //             </div>
// //           ) : (
// //             <div className='table-container'>
// //               <table id='reports-data-table' className='table'>
// //                 <thead className='sticky'>
// //                   <tr className='table-head-color'>
// //                     {header.map((title, i) => (
// //                       <td key={i}> {title} </td>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>{MemoizedTableRow}</tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       ) : null}
// //     </div>
// //   );
// // };

// const Dashboard = () => {
//   document.title = 'PrimarySales | Dashboard';

//   // Retrieve profile details from local storage
//   const profileDetails = useMemo(() => {
//     return (
//       JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_KEY)) || {}
//     );
//   }, []);

//   // Memoize the saleAccess value
//   const saleAccess = useMemo(() => {
//     return profileDetails.salesAccess || [];
//   }, [profileDetails.salesAccess]); // Only recompute if profileDetails.salesAccess changes

//   // const { userDetails, saleAccess } = UserState();
//   console.log(saleAccess);

//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [salesData, setSalesData] = useState([]);
//   const [records, setRecords] = useState(0);
//   const [updateTime, setUpdateTime] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(50);
//   const [divisions, setDivisions] = useState([]);
//   const [hqs, setHqs] = useState([]);
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedHq, setSelectedHq] = useState('');

//   useEffect(() => {
//     fetchUpdateTime().then((time) => {
//       setUpdateTime(time);
//     });
//   }, []);

//   useEffect(() => {
//     if (saleAccess && saleAccess.length > 0) {
//       const divisions = saleAccess.map((division) => ({
//         id: division.DivisionCode,
//         name: division.DivisionName,
//       }));
//       setDivisions(divisions);
//     }
//   }, [saleAccess]);

//   useEffect(() => {
//     if (selectedDivision && saleAccess && saleAccess.length > 0) {
//       const selectedDivisionInfo = saleAccess.find(
//         (div) => div.DivisionCode === selectedDivision
//       );
//       if (selectedDivisionInfo) {
//         const hqCodes = selectedDivisionInfo.SaleHQCodes || '';
//         console.log(selectedDivision, hqCodes);
//         fetchHqs(selectedDivision, hqCodes).then((data) => {
//           setHqs(data);
//         });
//       }
//     }
//   }, [selectedDivision, saleAccess]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     getReports(event, newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//     getReports(event, 1, +event.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPage(0);
//     getReports(e, 1);
//   };

//   const getReports = useCallback(
//     async (e, pageNumber, limit) => {
//       e.preventDefault();

//       if (!fromDate || !toDate) {
//         showToast('Please select a date');
//         return;
//       }

//       const limitofRecords = limit || rowsPerPage;
//       const url = `${process.env.REACT_APP_API}/sales?page=${
//         pageNumber || 1
//       }&limit=${limitofRecords}`;

//       const divisionCode =
//         selectedDivision !== ''
//           ? divisions.find((div) => div.id === selectedDivision)
//           : '';

//       const body = {
//         fromDate: moment(fromDate).format('DD-MM-YYYY'),
//         toDate: moment(toDate).format('DD-MM-YYYY'),
//         divisionCode,
//         hqCode: selectedHq,
//       };
//       console.log(body);

//       const jwtToken = Cookies.get('sales-token');
//       const headers = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${jwtToken}`,
//       };

//       LoaderOpen('Searching for information. Please wait.');

//       try {
//         const response = await axios.post(url, body, { headers });

//         if (response.status === 200) {
//           setSalesData(response.data.data);
//           setRecords(response.data.totalRecords);
//           setShowResult(true);
//         } else {
//           handleApiError(response);
//         }
//       } catch (error) {
//         handleApiError(error);
//       } finally {
//         LoaderClose();
//       }
//     },
//     [fromDate, toDate, rowsPerPage, selectedDivision, selectedHq, divisions]
//   );

//   const handleDownloadExcel = async (e) => {
//     e.preventDefault();

//     const durl = `${process.env.REACT_APP_API}/sales/downloadreports`;

//     const body = {
//       fromDate: moment(fromDate).format('DD-MM-YYYY'),
//       toDate: moment(toDate).format('DD-MM-YYYY'),
//       divisionCode: selectedDivision,
//       hqCode: selectedHq,
//     };

//     const jwtToken = Cookies.get('sales-token');
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${jwtToken}`,
//     };

//     LoaderOpen('Downloading data. Please wait.');

//     try {
//       const response = await axios.post(durl, body, {
//         responseType: 'arraybuffer',
//         headers,
//       });

//       if (response.status === 200) {
//         fileDownload(response.data, 'sales.xlsx');
//       }
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       LoaderClose();
//     }
//   };

//   // Table Header  Columns and Name

//   const header = [
//     // 's.No',
//     'InvoiceNo',
//     'InvoiceDate',
//     'PlantCode',
//     'PlantName',
//     'HQName',
//     'DivisionName',
//     'CustomerName',
//     'CustomerCity',
//     'StateName',
//     'MaterialCode',
//     'MaterialName',
//     'BrandName',
//     'TherapeuticName',
//     'SaleQty',
//     'SaleAmount',
//     'FreeQty',
//     'ReturnQty',
//     'ReturnAmount',
//     'NetQty',
//     'NetAmount',
//     'TaxAmount',
//     'TotalAmount',
//     'AMName',
//     'RMName',
//     'DMName',
//     'ZMName',
//   ];

//   const MemoizedTableRow = useMemo(() => {
//     return salesData.map((report, index) => (
//       <tr key={index}>{/* Render table rows here based on report data */}</tr>
//     ));
//   }, [salesData]);
//   return (
//     <div style={{ height: '100vh' }}>
//       <Header />
//       <p className='m-3 text-primary d-inline'>
//         Data Available UpTo: {updateTime}
//       </p>
//       <div className='container-fluid mt-1'>
//         <div className='card  inputs-container'>
//           <div className='card-body px-3 pb-2 pt-0'>
//             <form className='row'>
//               <div className='col-6 col-md-2 pe-3 my-2'>
//                 <label htmlFor='fromDate' className='form-label'>
//                   From Date
//                 </label>
//                 <input
//                   type='date'
//                   className='form-control'
//                   id='fromDate'
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   required={true}
//                   format='DD-MM-YYYY'
//                   min={'2024-04-01'}
//                   max={toDate}
//                 />
//               </div>
//               <div className='col-6 col-md-2 pe-3 my-2'>
//                 <label htmlFor='inputPassword4' className='form-label'>
//                   To date
//                 </label>
//                 <input
//                   type='date'
//                   className='form-control'
//                   id='fromDate'
//                   value={toDate}
//                   required={true}
//                   onChange={(e) => setToDate(e.target.value)}
//                   format='DD-MM-YYYY'
//                   min={fromDate}
//                 />
//               </div>
//               {saleAccess && saleAccess.length > 1 && (
//                 <DropDown
//                   label={'Division'}
//                   data={divisions}
//                   selectedValue={selectedDivision}
//                   onChangeHandle={setSelectedDivision}
//                 />
//               )}
//               {/* <DropDown
//                 label={'Zone'}
//                 data={zone}
//                 selectedValue={selectedZone}
//                 onChangeHandle={setSelectedZone}
//               />
//               <DropDown
//                 label={'Region'}
//                 data={region}
//                 selectedValue={selectedRegion}
//                 onChangeHandle={setSelectedRegion}
//               /> */}
//               {saleAccess && saleAccess.length > 1 && (
//                 <MultiDropdown
//                   label={'Head Quarters'}
//                   data={hqs}
//                   selectedValue={selectedHq}
//                   onChangeHandle={setSelectedHq}
//                 />
//               )}
//               <div className='col-12 d-flex justify-content-center align-items-center'>
//                 <button
//                   className='btn download_btn me-2'
//                   onClick={handleSubmit}>
//                   Search
//                 </button>
//                 <button
//                   disabled={salesData.length <= 0}
//                   onClick={handleDownloadExcel}
//                   className='btn download_btn'>
//                   Download Sheet
//                   <img src='../../download.svg' alt='hetero' className='m-1' />
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className='result-count-container'>
//         {showResult ? (
//           <div className='row w-100 d-flex mt-1 mt-md-0 mx-3'>
//             <span className='results-text col-12 col-md-6 align-self-center'>
//               Total Records - {records}
//             </span>
//             <TablePagination
//               className='col-12 col-md-6 pagination-container'
//               rowsPerPageOptions={[50, 100, 500]}
//               component='div'
//               count={records}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </div>
//         ) : null}
//       </div>

//       {showResult ? (
//         <div className='mx-3 mb-2  d-flex flex-column'>
//           {salesData.length === 0 ? (
//             <div className='d-flex align-items-center justify-content-center mt-5 p-5'>
//               <h3 style={{ color: 'red' }}>No Result Found</h3>
//             </div>
//           ) : (
//             <div className='table-container'>
//               <table id='reports-data-table' className='table'>
//                 <thead className='sticky'>
//                   <tr className='table-head-color'>
//                     {header.map((title, i) => (
//                       <td key={i}> {title} </td>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>{MemoizedTableRow}</tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Dashboard;
