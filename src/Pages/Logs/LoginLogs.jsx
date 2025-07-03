/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { handleApiError } from '../../Utils/Swalhandler/Error';
import { LoaderOpen, LoaderClose } from '../../Utils/Swalhandler/LoaderHandler';

import Logs, { DownloadExcel } from '../../components/Logs';
import Header from '../../components/Header';
// import Footer from '../Components/Footer';
import Cookies from 'js-cookie';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Mymeetings = () => {
  document.title = 'PrimarySales | Logs';
  const [loginLogs, setLoginLogs] = useState([]);
  const [serachLogs, setSearchLogs] = useState([]);
  const [filterLoginLogs, setfilterLoginLogs] = useState([]);
  const [filterSerachLogs, setfilterSearchLogs] = useState([]);
  const [searchText, setSearchText] = useState('');

  const baseUrl = `${process.env.REACT_APP_API}/logs`;

  useEffect(() => {
    const getLogs = async () => {
      try {
        const jwtToken = Cookies.get(process.env.REACT_APP_TOKEN);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        };
        const loginurl = `${baseUrl}/login-logs`;
        const searchurl = `${baseUrl}/search-logs`;

        LoaderOpen('Logs Loading please wait ...'); // Assuming this starts a loader/spinner

        const [loginres, searchres] = await Promise.all([
          axios.post(loginurl, {}, { headers }),
          axios.post(searchurl, {}, { headers }),
        ]);

        if (loginres && loginres.status === 200) {
          LoaderClose();
          setLoginLogs(loginres.data.logs);
          setfilterLoginLogs(loginres.data.logs);
        }
        if (searchres && searchres.status === 200) {
          LoaderClose();
          setSearchLogs(searchres.data.logs);
          setfilterSearchLogs(searchres.data.logs);
        }

        LoaderClose(); // Assuming this stops the loader/spinner
      } catch (err) {
        LoaderClose(); // Ensure loader is closed in case of error
        handleApiError(err);
      }
    };

    getLogs(); // Call the async function within useEffect
  }, [baseUrl, LoaderOpen, LoaderClose, handleApiError]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchText('');
  };
  const loginheader = [
    's.No',
    'EmpId',
    'Employee Name',
    'ActionType',
    'Action Time',
  ];
  const searchheader = [
    's.No',
    'EmpId',
    'Employee Name',
    'ActionType',
    'From Date',
    'To Date',
    'Division',
    'HQ',
    'Records',
    'Action Time',
  ];
  useEffect(() => {
    const logs = value === 0 ? loginLogs : serachLogs;
    const setFunction = value === 0 ? setfilterLoginLogs : setfilterSearchLogs;
    const filterData = logs.filter(
      (log) =>
        log.EmpId.includes(searchText) ||
        log.EmpName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFunction(filterData);
  }, [searchText, value]);

  return (
    <>
      <Header />
      <div className='mx-2 mx-md-5 '>
        <Box sx={{ width: '100%' }}>
          <div className='d-flex justify-content-between align-items-center'>
            <Box
              sx={{
                width: 'fit-content',
                borderBottom: 1,
                borderColor: 'divider',
              }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'>
                <Tab label='Login Logs' {...a11yProps(0)} />
                <Tab label='Search' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <DownloadExcel
              logs={value === 0 ? filterLoginLogs : filterSerachLogs}
              header={value === 0 ? loginheader : searchheader}
              handleData={setSearchText}
              searchText={searchText}
            />
          </div>
          <CustomTabPanel value={value} index={0}>
            <Logs logs={filterLoginLogs} header={loginheader} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Logs logs={filterSerachLogs} header={searchheader} />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
};

export default Mymeetings;
