/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const FormcontextProvider = ({ children }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedHq, setSelectedHq] = useState([]);
  const [saleAccess, setSaleAccess] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [hqs, setHqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedBrands, setSelectedBrands] = useState([]);

  return (
    <FormContext.Provider
      value={{
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        selectedDivision,
        setSelectedDivision,
        selectedHq,
        setSelectedHq,
        saleAccess,
        setSaleAccess,
        divisions,
        setDivisions,
        hqs,
        setHqs,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage, // number of data per page
        selectedBrands,
        setSelectedBrands,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormcontextProvider;

export const useFormState = () => {
  return useContext(FormContext);
};
