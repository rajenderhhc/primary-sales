/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  isHqEnabled,
  isDivisionEnable,
  fetchDivisions,
  fetchHqs,
} from '../Pages/Dashboard/dashboardFun';
import { DropDown, MultiDropdown } from './DropDown';
import { useFormState } from '../Context/FormContenxt';

const Form = (props) => {
  const {
    handleSubmit,
    handleDownloadExcel,
    salesData,
    handleGraphView,
    showTable,
  } = props;
  const profileDetails = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_USER_KEY)
  );

  const {
    toDate,
    setToDate,
    selectedDivision,
    setSelectedDivision,
    selectedHq,
    setSelectedHq,
    divisions,
    hqs,
    setDivisions,
    setHqs,
  } = useFormState();

  const { saleAccess } = profileDetails;

  useEffect(() => {
    if (
      saleAccess &&
      saleAccess.length > 0 &&
      saleAccess[0].DivisionCode.toLowerCase() !== 'all'
    ) {
      const divisions = saleAccess.map((division) => ({
        id: division.DivisionCode,
        name: division.DivisionName,
      }));
      setDivisions(divisions);
    } else {
      const division = saleAccess[0].DivisionCode;
      fetchDivisions(division).then((divisions) => {
        if (divisions) setDivisions(divisions);
      });
    }
  }, []);

  useEffect(() => {
    setSelectedHq([]);
    let Division = '';
    if (saleAccess.length > 1) {
      const selectdData = saleAccess.find(
        (div) => div.DivisionCode === selectedDivision
      );
      Division = selectdData ? selectdData.DivisionCode : '';
    } else {
      Division = saleAccess[0].DivisionCode;
    }

    if (Division !== '') {
      const hqCodes = saleAccess.find(
        (div) => div.DivisionCode === Division
      ).SaleHQCodes;
      const divCode =
        Division.toLowerCase() === 'all' ? selectedDivision : Division;

      fetchHqs(divCode, hqCodes).then((data) => {
        if (data) setHqs(data);
      });
    }
  }, [selectedDivision]);

  return (
    <div className='container-fluid mt-1'>
      <div className='card  inputs-container'>
        <div className='card-body px-3 pb-2 pt-0'>
          <div className='row'>
            <div className='col-6 col-md-2 pe-3 my-2'>
              <div className='lable-container'>
                <label htmlFor='fromDate' className='form-label'>
                  Select Month
                </label>
                <span className='star-required'>*</span>
              </div>
              <input
                type='month'
                className='form-control'
                id='fromDate'
                value={toDate}
                required={true}
                onChange={(e) => setToDate(e.target.value)}
                min='2024-01'
              />
            </div>
            {isDivisionEnable(saleAccess) && (
              <DropDown
                label={'Division'}
                isRequired={true}
                data={divisions}
                selectedValue={selectedDivision}
                onChangeHandle={setSelectedDivision}
              />
            )}

            {isHqEnabled(saleAccess) && (
              <MultiDropdown
                label={'Head Quarters'}
                isRequired={false}
                data={hqs}
                selectedValue={selectedHq}
                onChangeHandle={setSelectedHq}
              />
            )}
            <div className='col-12 d-flex justify-content-center align-items-center'>
              <button
                className='btn download_btn me-2'
                onClick={handleSubmit}
                disabled={
                  toDate === '' ||
                  (isDivisionEnable(saleAccess) && selectedDivision === '')
                }>
                Search
              </button>
              <button
                disabled={salesData.length <= 0}
                onClick={handleDownloadExcel}
                className='btn download_btn'>
                Download Sheet
                <img src='../../download.svg' alt='hetero' className='m-1' />
              </button>
              {salesData.length > 0 && (
                <button
                  disabled={salesData.length <= 0}
                  onClick={() => handleGraphView(!showTable)}
                  className='btn download_btn ms-2'>
                  {showTable ? 'Show Graph' : 'Show Table'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
