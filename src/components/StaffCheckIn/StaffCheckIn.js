import React, { useEffect, useState } from 'react';
import './StaffCheckIn.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { getFlightDetails, getPassengers, getAncillary } from '../../Redux/Reducer/admin';
import { getCheckin } from '../../Redux/Reducer/staff';
import { useDispatch, useSelector } from 'react-redux';
import PassengerCheckInDetails from './PassengerCheckInDetails';
import Card from 'react-bootstrap/Card';
import SeatMap from '../SeatMap/SeatMap';

const StaffCheckIn = () => {
 useAuthentication('staff');

 const dispatch = useDispatch();
 const [selectedFlight, setFlight] = useState('');
 const [checkedIn, setCheckedIn] = useState('');
 const [service, setService] = useState();

 useEffect(() => {
  dispatch(getPassengers());
  dispatch(getCheckin());
  dispatch(getAncillary());
  dispatch(getFlightDetails());
 }, []);

 const flights = useSelector((state) => state.admins.flights);

 let services = useSelector((state) => state.admins.services);
 let checkInDetails = useSelector((state) => state.staffs.checkin);
 let passengers = useSelector((state) => state.admins.passengers);

 if (selectedFlight) {
  services = services.filter((service) => service.flight === selectedFlight);
  passengers = passengers.filter((passenger) => passenger.flight === selectedFlight);
 }

 if (checkedIn) {
  checkInDetails = checkInDetails.filter((checkIn) => checkIn.isCheckedIn === checkedIn);
 }

 if (service) {
  checkInDetails = checkInDetails.filter((checkIn) => checkIn.services.includes(service));
 }

 return (
  <>
   <BackButton />
   <h1 className="fs-3 text-center text-dark">Check In</h1>
   <h2 className="fs-5 text-center text-dark">Check In Details</h2>
   <Card className="mb-3">
    <p className="h5 m-2">Filter Passenger details</p>
    <div className="d-flex">
     <select
      className="form-control w-25 m-2 h-25"
      onChange={(e) => {
       setFlight(e.target.value);
       setService('');
      }}>
      <option value="">Select Flight</option>
      {flights.map((flight) => (
       <option key={flight.id} value={flight.id}>
        {flight.name}
       </option>
      ))}
     </select>
     <select
      className="form-control w-25 m-2 h-25"
      onChange={(e) => {
       setCheckedIn(e.target.value);
      }}>
      <option value="">CheckIn</option>
      <option value="Y">Yes</option>
      <option value="N">No</option>
     </select>

     <select
      className="form-control w-25 m-2 h-25"
      onChange={(e) => {
       setService(parseInt(e.target.value));
      }}>
      <option value="">Select Servies</option>
      {services.map((service) => (
       <option key={service.id} value={service.id}>
        {service.service}
       </option>
      ))}
     </select>
    </div>
   </Card>
   <Card>
    <SeatMap data={passengers} selectedFlight={selectedFlight} checkInDetails={checkInDetails} />
   </Card>
   <Card className="staff-checkin mt-1">
    <p className="m-auto m-md-1 p-sm-1 fw-bold">List of Passenger checkin details</p>
    <ul className="d-none d-sm-none d-md-flex flex-row list-unstyled fw-bold">
     <li>Flight</li>
     <li>Seat No</li>
     <li>Name</li>
     <li>Status</li>
     <li>Services</li>
     <li>Change Status</li>
    </ul>
    {passengers.map((passenger, index) => (
     <PassengerCheckInDetails
      key={index}
      flight={passenger.flight}
      id={passenger.id}
      name={passenger.name}
      checkInDetails={checkInDetails.find((chckin) => chckin.id === passenger.id)}
     />
    ))}
   </Card>
  </>
 );
};

export default StaffCheckIn;
