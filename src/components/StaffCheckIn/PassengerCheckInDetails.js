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
    <tr>
     <td>{flight}</td>
     <td>{checkInDetails?.seatno}</td>
     <td>{name}</td>
     <td>{checkInDetails?.isCheckedIn}</td>
     <td>{servicesList}</td>
     <td>
      <button
       className={
        checkInDetails?.isCheckedIn === 'N' ? 'btn btn-outline-success' : 'btn btn-outline-danger'
       }
       onClick={toggleCheckin}>
       {checkInDetails?.isCheckedIn === 'N' ? 'Check-in' : 'Check-out'}
      </button>
     </td>
    </tr>
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
