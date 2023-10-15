import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editServices } from '../../Redux/Reducer/staff';
import PropTypes from 'prop-types';

import ModifyService from './ModifyService';

const StaffInFlightDetails = ({ flight, name, checkInDetails, id }) => {
 const dispatch = useDispatch();
 const services = useSelector((state) => state.admins.services);
 const [ansiSelections, setAnsiSelections] = useState();
 const [mealSelections, setMealSelections] = useState();
 const [shopSelections, setShopSelections] = useState();

 const servicesList = (type) => {
  return services
   .filter((service) => service.flight === flight && service.type === type)
   .map((option) => ({
    label: option.service,
    value: option.id
   }));
 };

 const selectedOption = (type) => {
  const options = [];
  checkInDetails?.services?.forEach((service) => {
   const serObj = services?.find((ser) => ser.id == service && ser.type == type);
   if (serObj) options.push({ label: serObj.service, value: service });
  });
  return options;
 };

 const setChange = (...selectedOptions) => {
  const newOption = [...checkInDetails.services];
  if (selectedOptions[1].action == 'select-option') {
   selectedOptions[0].forEach((option) => {
    if (!checkInDetails?.services.includes(option.value)) {
     newOption.push(option.value);
    }
   });
   dispatch(editServices({ id, data: { services: newOption } }));
  } else if (selectedOptions[1].action == 'remove-value') {
   const index = newOption.indexOf(selectedOptions[1].removedValue.value);
   newOption.splice(index, 1);
   dispatch(editServices({ id, data: { services: newOption } }));
  } else if (selectedOptions[1].action == 'clear') {
   const clearSer = [];
   const updatedSer = [];
   selectedOptions[1].removedValues.forEach((removedVal) => {
    clearSer.push(removedVal.value);
   });
   newOption.forEach((option) => {
    if (!clearSer.includes(option)) {
     updatedSer.push(option);
    }
   });
   dispatch(editServices({ id, data: { services: updatedSer } }));
  }
 };

 useEffect(() => {
  setAnsiSelections(selectedOption('02'));
  setMealSelections(selectedOption('01'));
  setShopSelections(selectedOption('03'));
 }, [checkInDetails, services]);
 return (
  <>
   {checkInDetails && (
    <ul className="d-sm-block d-md-flex flex-row list-unstyled">
     <li>
      <span className="fw-bold d-md-none">Flight : </span>
      {flight}
     </li>
     <li>
      <span className="fw-bold d-md-none">Name : </span>
      {name}
     </li>
     <li>
      <span className="fw-bold d-md-none">Ancillary services :</span>
      <ModifyService
       setChange={setChange}
       selectedOption={ansiSelections}
       options={servicesList('02')}
       name={'ansi'}
      />
     </li>
     <li>
      <span className="fw-bold d-md-none">Meal preferences :</span>
      <ModifyService
       setChange={setChange}
       selectedOption={mealSelections}
       options={servicesList('01')}
       name={'meal'}
      />
     </li>
     <li>
      <span className="fw-bold d-md-none">Inflight shopping :</span>
      <ModifyService
       setChange={setChange}
       selectedOption={shopSelections}
       options={servicesList('03')}
       name={'shop'}
      />
     </li>
    </ul>
   )}
  </>
 );
};

StaffInFlightDetails.propTypes = {
 flight: PropTypes.string,
 name: PropTypes.string,
 checkInDetails: PropTypes.object,
 id: PropTypes.number
};

export default StaffInFlightDetails;
