import React, { useMemo } from 'react';

const DataTable = ({ headers, salesData }) => {
  const headerRow = useMemo(
    () => (
      <thead className='sticky'>
        <tr className='table-head-color'>
          {headers.map((title, i) => (
            <th key={i}>{title}</th>
          ))}
        </tr>
      </thead>
    ),
    [headers]
  );

  const tableRows = useMemo(
    () =>
      salesData.map((p, i) => (
        <tr key={i}>
          <td>{p.MaterialName ?? p.CustomerName}</td>
          <td>{p.CurrentMonthQuantity ?? 0}</td>
          <td>{p.PreviousMonthRevenue ?? 0}</td>
          <td>{p.CurrentMonthRevenue ?? 0}</td>
          <td>{p.GrowthPercentage ?? 100} %</td>
          <td>{p.GrowthPercentage > 0 ? 'Increase' : 'Decrease'}</td>
        </tr>
      )),
    [salesData]
  );

  return (
    <table id='reports-data-table' className='table'>
      {headerRow}
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default DataTable;
