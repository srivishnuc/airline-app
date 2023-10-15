import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPassenger as updatePass } from '../../Redux/Reducer/admin';
import PropTypes from 'prop-types';

const PassengerList = ({ flight, id, name, passno, address, setError, dob }) => {
 const [editPassenger, setEditPassenger] = useState(false);
 const [psname, setName] = useState(name);
 const [pspno, setPassno] = useState(passno);
 const [psadd, setAddress] = useState(address);
 const [psdate, setDate] = useState(dob);
 const [pflight, setFlight] = useState(flight);
 const flights = useSelector((state) => state.admins.flights);
 const dispatch = useDispatch();
 const updatePassenger = () => {
  if (!editPassenger) {
   setEditPassenger(true);
  } else {
   if (psname.trim() && pspno.trim() && psadd.trim()) {
    dispatch(
     updatePass({
      id,
      data: { flight: pflight, name: psname, address: psadd, passportNo: pspno, dob: psdate }
     })
    );
    setEditPassenger(false);
    setError(false);
   } else {
    setError(true);
   }
  }
 };
 return (
  <ul className="d-sm-block d-md-flex flex-row list-unstyled">
   <li>
    <span className="fw-bold d-md-none">Flight : </span>
    {editPassenger ? (
     <select
      className="form-control w-75"
      onChange={(e) => {
       setFlight(e.target.value);
      }}>
      {flights.map((flight) => (
       <option key={flight.id} value={flight.value}>
        {flight.name}
       </option>
      ))}
     </select>
    ) : (
     flight
    )}
   </li>
   <li>
    <span className="fw-bold d-md-none">Name : </span>
    {editPassenger ? (
     <input
      type="text"
      className="form-control w-50"
      value={psname}
      onChange={(e) => {
       setName(e.target.value);
      }}
     />
    ) : (
     name
    )}
   </li>
   <li>
    <span className="fw-bold d-md-none">DOB : </span>
    {editPassenger ? (
     <input
      type="date"
      className="form-control w-50"
      value={psdate}
      onChange={(e) => {
       setDate(e.target.value);
      }}
     />
    ) : (
     dob
    )}
   </li>
   <li>
    <span className="fw-bold d-md-none">Passport no : </span>
    {editPassenger ? (
     <input
      type="text"
      className="form-control w-50"
      value={pspno}
      onChange={(e) => {
       setPassno(e.target.value);
      }}
     />
    ) : (
     passno
    )}
   </li>
   <li>
    <span className="fw-bold d-md-none">Address : </span>
    {editPassenger ? (
     <input
      type="text"
      className="form-control w-50"
      value={psadd}
      onChange={(e) => {
       setAddress(e.target.value);
      }}
     />
    ) : (
     address
    )}
   </li>
   <li>
    {
     <button className="btn btn-outline-primary btn-sm" onClick={updatePassenger}>
      {editPassenger ? 'Update' : 'Edit'}
     </button>
    }
    {editPassenger && (
     <button
      className="btn btn-cancel btn-outline-danger btn-sm"
      onClick={() => {
       setName(name);
       setPassno(passno);
       setAddress(address);
       setEditPassenger(false);
       setError(false);
      }}>
      &nbsp;Cancel
     </button>
    )}
   </li>
  </ul>
 );
};

PassengerList.propTypes = {
 flight: PropTypes.string,
 id: PropTypes.number,
 name: PropTypes.string,
 passno: PropTypes.string,
 address: PropTypes.string,
 setError: PropTypes.func,
 dob: PropTypes.string
};

export default PassengerList;
