import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const ModifyService = ({ setChange, selectedOption, options, name }) => {
 return (
  <>
   <Select
    className="w-75"
    name={name}
    value={selectedOption}
    onChange={setChange}
    isMulti
    options={options}
   />
  </>
 );
};

ModifyService.propTypes = {
 setChange: PropTypes.func,
 selectedOption: PropTypes.array,
 modifyService: PropTypes.func,
 updateBtn: PropTypes.func,
 options: PropTypes.array,
 name: PropTypes.string
};

export default ModifyService;
