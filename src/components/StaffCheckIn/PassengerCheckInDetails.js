import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { editCheckin } from '../../Redux/Reducer/staff';
import { useDispatch } from 'react-redux';

const PassengerCheckInDetails = ({ flight, name, checkInDetails, id }) => {
 const dispatch = useDispatch();
 const services = useSelector((state) => state.admins.services);
 const servicesList =
  checkInDetails !== undefined ? (
   checkInDetails.services.map((service, index) => {
    const serviceObj = services.length ? services.find((ser) => ser.id === service) : [];
    return (
     <span key={index}>
      {serviceObj.service}
      {index === checkInDetails.services.length - 1 ? '.' : ', '}
     </span>
    );
   })
  ) : (
   <span></span>
  );

 const toggleCheckin = () => {
  dispatch(
   editCheckin({ id, data: { isCheckedIn: checkInDetails.isCheckedIn === 'Y' ? 'N' : 'Y' } })
  );
 };

 return (
  <>
   {checkInDetails && (
    <ul className="d-sm-block d-md-flex flex-row list-unstyled">
     <li>
      <span className="fw-bold d-md-none w-25">Flight : </span>
      {flight}
     </li>
     <li>
      <span className="fw-bold d-md-none w-25">Seat No : </span>
      {checkInDetails?.seatno}
     </li>
     <li>
      <span className="fw-bold d-md-none">Name : </span>
      {name}
     </li>
     <li>
      <span className="fw-bold d-md-none">Status : </span>
      {checkInDetails?.isCheckedIn}
     </li>
     <li>
      <span className="fw-bold d-md-none">Services : </span>
      {servicesList}
     </li>
     <li>
      <button
       className={
        checkInDetails?.isCheckedIn === 'N' ? 'btn btn-outline-success' : 'btn btn-outline-danger'
       }
       onClick={toggleCheckin}>
       {checkInDetails?.isCheckedIn === 'N' ? 'Check-in' : 'Check-out'}
      </button>
     </li>
    </ul>
   )}
  </>
 );
};

PassengerCheckInDetails.propTypes = {
 flight: PropTypes.string,
 name: PropTypes.string,
 checkInDetails: PropTypes.object,
 id: PropTypes.number
};

export default PassengerCheckInDetails;
