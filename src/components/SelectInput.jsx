import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Years = ({ year, setYear }) => {
  //const currentYear = new Date().getFullYear();
  const yearsArray = ['2024'];

  //   Array.from(
  //   { length: currentYear - 2023 },
  //   (_, index) => 2023 + index
  // );

  const onChangeYear = (e) => {
    setYear(e.target.value);
  };
  return (
    <FormControl required size='small' sx={{ my: 1, maxWidth: 150 }}>
      <InputLabel id='year-simple-select-required-label'>Year</InputLabel>
      <Select
        labelId='year-simple-select-required-label'
        id='year-simple-select-required'
        value={year}
        label='Year *'
        onChange={onChangeYear}>
        {yearsArray.map((year, i) => (
          <MenuItem value={year} key={i}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const SelectOption = (props) => {
  const { label, data, option, setOption } = props;

  const onChangeOption = (e) => {
    setOption(e.target.value);
  };
  return (
    <>
      <FormControl
        required
        size='small'
        sx={{ my: 1, minWidth: 130, maxWidth: 150 }}>
        <InputLabel id='brand-simple-select-required-label'>{label}</InputLabel>
        <Select
          labelId='brand-simple-select-required-label'
          id='brand-simple-select-required'
          value={option}
          label={label}
          onChange={onChangeOption}>
          {data.map((obj, i) => (
            <MenuItem value={obj.code} key={i}>
              {obj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
