import React, { useEffect, useState } from 'react';
import './StaffInFlight.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import { getPassengers, getAncillary, getFlightDetails } from '../../Redux/Reducer/admin';
import { getCheckin } from '../../Redux/Reducer/staff';
import StaffInFlightDetails from './StaffInFlightDetails';
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
   <Card className="mb-3">
    <p className="h5 m-2">Filter Passenger details</p>
    <select
     className="form-control w-25 m-2"
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
   </Card>
   <Card className="staff-inflight">
    <p className="m-auto m-md-1 p-sm-1 fw-bold">Passenger service details</p>
    <ul className="d-none d-sm-none d-md-flex flex-row list-unstyled fw-bold">
     <li>Flight</li>
     <li>Name</li>
     <li>Ancillary Services</li>
     <li>Meal Preferences</li>
     <li>Inflight Shopping</li>
    </ul>
    {passengerDetails.map((passenger) => (
     <StaffInFlightDetails
      key={passenger.id}
      id={passenger.id}
      flight={passenger.flight}
      name={passenger.name}
      checkInDetails={checkInDetails.find((chckin) => chckin.id === passenger.id)}
     />
    ))}
   </Card>
  </>
 );
};

export default StaffInFlight;
