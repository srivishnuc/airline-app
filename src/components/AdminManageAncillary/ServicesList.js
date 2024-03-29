import React, { useState } from 'react';
import { delAncillary, editAncillary } from '../../Redux/Reducer/admin';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ServiceList = ({ flight, serviceTypes, service, id, setError }) => {
 const [isEdit, setisEdit] = useState(false);
 const [editVal, setEditVal] = useState(service);
 const [selectedService, setServiceType] = useState(serviceTypes?.id);
 const allServices = useSelector((state) => state.admins.servicesType);
 const dispatch = useDispatch();
 const EditServices = () => {
  setisEdit(true);
 };
 const DeleteServices = () => {
  dispatch(delAncillary({ id }));
 };

 const updateService = () => {
  if (editVal) {
   dispatch(editAncillary({ id, data: { service: editVal, flight, type: selectedService } }));
   setisEdit(false);
  } else {
   setError(true);
  }
 };
 return (
  <ul className="d-sm-block  d-md-flex flex-row list-unstyled" data-testid={'service'}>
   <li>
    <span className="fw-bold d-md-none">Flight : </span>
    {flight}
   </li>
   <li>
    <span className="fw-bold d-md-none">Type : </span>
    {isEdit ? (
     <select
      className="form-control"
      value={selectedService}
      onChange={(e) => {
       setServiceType(e.target.value);
      }}>
      {allServices.map((stype) => (
       <option key={stype.id} value={stype.id}>
        {stype.type}
       </option>
      ))}
     </select>
    ) : (
     serviceTypes?.type
    )}
   </li>
   <li>
    <span className="fw-bold d-md-none">Services : </span>
    {isEdit ? (
     <>
      <input
       type="text"
       className="form-control w-50"
       value={editVal}
       onChange={(e) => {
        setError(false);
        setEditVal(e.target.value);
       }}
      />
      <button className="btn mt-1 btn-outline-primary btn-sm" onClick={updateService}>
       Update
      </button>
      <button
       className="btn mt-1 btn-delete btn-outline-danger btn-sm"
       onClick={() => {
        setisEdit(false);
        setEditVal(service);
        setError(false);
       }}>
       Cancel
      </button>
     </>
    ) : (
     service
    )}
   </li>
   <li>
    <span>
     <button className="btn btn-outline-primary btn-sm" onClick={EditServices}>
      Edit
     </button>
    </span>
    <span>
     <button className="btn btn-delete btn-outline-danger btn-sm" onClick={DeleteServices}>
      Delete
     </button>
    </span>
   </li>
  </ul>
 );
};

ServiceList.propTypes = {
 flight: PropTypes.string,
 service: PropTypes.string,
 serviceTypes: PropTypes.object,
 id: PropTypes.number,
 setError: PropTypes.func
};

export default ServiceList;
