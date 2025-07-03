import React, { useState, useEffect } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './component.css';

const Logs = ({ logs, header }) => {
  const [currentLogs, setCurrentLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10; // number of logs per page
  const maxPagesToShow = 10; // Maximum number of page buttons to display

  useEffect(() => {
    const startIndex = (currentPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    setCurrentLogs(logs.slice(startIndex, endIndex));
  }, [logs, currentPage]);

  const totalPages = Math.ceil(logs.length / logsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const activePage = currentPage;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(activePage - halfMaxPagesToShow, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Adjust startPage and endPage when nearing the beginning or end of totalPages
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === activePage ? 'active' : ''}`}>
          <span className='page-link' onClick={() => handlePageChange(i)}>
            {i}
          </span>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='mt-3'>
      {logs.length > 0 ? (
        <div className='log-table-container'>
          <table id='reports-data-table' className='table'>
            <thead className='sticky'>
              <tr className='table-head-color'>
                {header.map((title, i) => (
                  <th key={i}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, i) => (
                <tr key={i} className='body-content'>
                  <td>{(currentPage - 1) * logsPerPage + i + 1}</td>
                  <td>{log.EmpId}</td>
                  <td>{log.EmpName}</td>
                  <td>{log.actionType}</td>
                  {/* {log.searchFilters && <td>{log.searchFilters}</td>} */}
                  {log.searchFilters && (
                    <td>{JSON.parse(log.searchFilters).fromDate}</td>
                  )}
                  {log.searchFilters && (
                    <td>{JSON.parse(log.searchFilters).toDate}</td>
                  )}
                  {log.searchFilters && (
                    <td>{JSON.parse(log.searchFilters).divisionCode}</td>
                  )}
                  {log.searchFilters && (
                    <td>{JSON.parse(log.searchFilters).hqCode}</td>
                  )}

                  {log.noOfRecords && <td>{log.noOfRecords}</td>}
                  <td>{log.action_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Logs Found</div>
      )}

      {logs.length > 0 && totalPages > 1 && (
        <div className='mt-2 d-flex justify-content-end'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <span
                  className='page-link'
                  aria-label='Previous'
                  onClick={() => handlePageChange(currentPage - 1)}>
                  <span aria-hidden='true'>&laquo;</span>
                </span>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${
                  currentPage === totalPages && 'disabled'
                }`}>
                <span
                  className='page-link'
                  aria-label='Next'
                  onClick={() => handlePageChange(currentPage + 1)}>
                  <span aria-hidden='true'>&raquo;</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Logs;

export const DownloadExcel = (props) => {
  const { logs, header, handleData, searchText } = props;
  const data = logs.map((log, i) => {
    const row = {
      's.no': i + 1,
      EmpId: log.EmpId,
      EmpName: log.EmpName,
      ActionType: log.actionType,
    };

    // Conditionally include search filters if they exist
    if (log.searchFilters) {
      row.FromDate = JSON.parse(log.searchFilters).fromDate;
      row.ToDate = JSON.parse(log.searchFilters).toDate;
      row.Division = JSON.parse(log.searchFilters).divisionCode;
      row.Hq = JSON.parse(log.searchFilters).hqCode;
    }

    // Conditionally include noOfRecords if it exists
    if (log.noOfRecords) {
      row.Records = log.noOfRecords;
    }
    row['ActionTime'] = log.action_time;

    return row;
  });

  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: 'Logs',
      sheet: 'logs',
      tablePayload: {
        header,
        body: data,
      },
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    handleData(value);
  };

  return (
    <>
      <div className='d-flex align-items-center border border-1 border-secondary rounded-1'>
        <input
          type='text'
          className='search-input'
          placeholder='Enter Employee Id or Name'
          value={searchText}
          onChange={handleChange}
        />
        <div className='border-start  border-secondary'>
          <SearchOutlinedIcon sx={{ color: '#b3b5b4' }} fontSize='large' />
        </div>
      </div>
      <button
        disabled={logs.length <= 0}
        onClick={handleDownloadExcel}
        className='btn download_btn'>
        Download Sheet
        <img src='../../download.svg' alt='hetero' className='m-1' />
      </button>
    </>
  );
};
