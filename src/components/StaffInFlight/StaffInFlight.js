import React, { useEffect, useState } from 'react';
import './StaffInFlight.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import { getPassengers, getAncillary, getFlightDetails } from '../../Redux/Reducer/admin';
import { getCheckin } from '../../Redux/Reducer/staff';
import StaffInFlightDetails from './StaffInFlightDetails';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const StaffInFlight = () => {
 useAuthentication('staff');
 const dispatch = useDispatch();

 const checkInData = useSelector((state) => state.staffs.checkin);
 const passengerData = useSelector((state) => state.admins.passengers);

 const [checkInDetails, setCheckInDetails] = useState([]);
 const [passengerDetails, setPassengerDetails] = useState([]);
 const flights = useSelector((state) => state.admins.flights);
 const [selectedFlight, setFlight] = useState('');

 useEffect(() => {
  dispatch(getPassengers());
  dispatch(getCheckin());
  dispatch(getAncillary());
  dispatch(getFlightDetails());
 }, []);

 useEffect(() => {
  setCheckInDetails(checkInData.filter((check) => check.isCheckedIn == 'Y'));
  if (selectedFlight) {
   setPassengerDetails(passengerData.filter((passenger) => passenger.flight === selectedFlight));
  } else {
   setPassengerDetails(passengerData);
  }
 }, [selectedFlight, checkInData, passengerData]);
 return (
  <>
   <BackButton />
   <h1 className="fs-3 text-center text-dark">In Flight</h1>
   <h2 className="fs-5 text-center text-dark">In Flight Details</h2>
   <Card className="mb-1">
    <p className="h5 m-2">Filter Passenger details</p>
    <div className="d-flex">
     <select
      className="form-control w-25 m-1 mb-3"
      value={selectedFlight}
      onChange={(e) => {
       setFlight(e.target.value);
      }}>
      <option value="">Select Flight</option>
      {flights.map((flight) => (
       <option key={flight.id} value={flight.id}>
        {flight.name}{' '}
       </option>
      ))}
     </select>
    </div>
   </Card>
   <Card className="staff-inflight table-responsive">
    <Table>
     <caption className="m-1">Passenger service details</caption>
     <thead>
      <tr>
       <th>Flight</th>
       <th>Name</th>
       <th>Ancillary Services</th>
       <th>Meal Preferences</th>
       <th>Inflight Shopping</th>
      </tr>
     </thead>
     <tbody>
      {passengerDetails.map((passenger) => (
       <StaffInFlightDetails
        key={passenger.id}
        id={passenger.id}
        flight={passenger.flight}
        name={passenger.name}
        checkInDetails={checkInDetails.find((chckin) => chckin.id === passenger.id)}
       />
      ))}
     </tbody>
    </Table>
   </Card>
  </>
 );
};

export default StaffInFlight;
