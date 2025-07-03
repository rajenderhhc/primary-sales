import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

import './component.css';

export const DropDown = (props) => {
  const { label, data, selectedValue, onChangeHandle, isRequired } = props;

  const handleOnChange = (e) => {
    onChangeHandle(e.target.value);
  };

  return (
    <div className='col-6 col-md-2 my-2 pe-3'>
      <div className='lable-container'>
        <label htmlFor='inputPassword4' className='form-label'>
          {label}
        </label>
        {isRequired && <span className='star-required'>*</span>}
      </div>
      <select
        className='form-control'
        name={label}
        onChange={handleOnChange}
        value={selectedValue}>
        <option value={''}>Select</option>
        {data.map((each, i) => (
          <option key={i} value={each.id}>
            {each.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const MultiDropdown = (props) => {
  const { label, data, selectedValue, onChangeHandle, isRequired } = props;
  const handleOnChange = (items) => {
    onChangeHandle(items);
  };

  return (
    <div className='col-12 col-md-6 my-2 pe-3'>
      <div className='lable-container '>
        <label htmlFor='inputPassword4' className='form-label'>
          {label}
        </label>
        {isRequired && <span className='star-required'>*</span>}
      </div>
      <Multiselect
        displayValue='name'
        onRemove={handleOnChange}
        selectedValues={selectedValue}
        onSelect={handleOnChange}
        options={data}
      />
    </div>
  );
};
