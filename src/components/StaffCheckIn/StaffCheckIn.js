import React, { useEffect, useState } from 'react';
import './StaffCheckIn.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { getFlightDetails, getPassengers, getAncillary } from '../../Redux/Reducer/admin';
import { getCheckin } from '../../Redux/Reducer/staff';
import { useDispatch, useSelector } from 'react-redux';
import PassengerCheckInDetails from './PassengerCheckInDetails';
import Table from 'react-bootstrap/table';
import Card from 'react-bootstrap/Card';

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
   <Card>
    <p className="h5 m-2">Filter Passenger details</p>
    <div className="d-flex">
     <select
      className="form-control w-25 m-3"
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
      className="form-control w-25 m-3"
      onChange={(e) => {
       setCheckedIn(e.target.value);
      }}>
      <option value="">CheckIn</option>
      <option value="Y">Yes</option>
      <option value="N">No</option>
     </select>

     <select
      className="form-control w-25 m-3"
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
   <Card className="staff-checkin table-responsive mt-1">
    <Table>
     <caption className="m-1">List of Passenger checkin details</caption>
     <thead>
      <tr>
       <th>Flight</th>
       <th>Seat No</th>
       <th>Name</th>
       <th>Status</th>
       <th>Services</th>
       <th>Change Status</th>
      </tr>
     </thead>
     <tbody>
      {passengers.map((passenger, index) => (
       <PassengerCheckInDetails
        key={index}
        flight={passenger.flight}
        id={passenger.id}
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

export default StaffCheckIn;
