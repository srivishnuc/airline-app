import React, { useEffect, useState } from 'react';
import './StaffCheckIn.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { getFlights, getPassengers, getServices } from '../../Redux/Reducer/admin';
import { getCheckin } from '../../Redux/Reducer/staff';
import { useDispatch, useSelector } from 'react-redux';
import PassengerCheckInDetails from './PassengerCheckInDetails';
import Table from 'react-bootstrap/table';
import Card from 'react-bootstrap/Card';

const StaffCheckIn = () => {
 const filterPassenger = [];
 const checkinFilter = (checkin) => {
  if (selectedFlight === '' && checkedIn === '' && service != '') {
   if (checkin.services.includes(parseInt(service))) {
    filterPassenger.push(checkin.id);
    return true;
   }
  } else if (selectedFlight === '' && checkedIn != '' && service === '') {
   if (checkin.isCheckedIn === checkedIn) {
    filterPassenger.push(checkin.id);
    return true;
   }
  } else if (selectedFlight != '' && checkedIn != '' && service === '') {
   if (checkin.isCheckedIn === checkedIn) {
    filterPassenger.push(checkin.id);
    return true;
   }
  } else if (selectedFlight != '' && checkedIn === '' && service != '') {
   if (checkin.services.includes(parseInt(service))) {
    filterPassenger.push(checkin.id);
    return true;
   }
  } else if (selectedFlight === '' && checkedIn != '' && service != '') {
   if (checkin.isCheckedIn === checkedIn && checkin.services.includes(parseInt(service))) {
    filterPassenger.push(checkin.id);
    return true;
   }
  } else if (selectedFlight != '' && checkedIn != '' && service != '') {
   if (checkin.isCheckedIn === checkedIn && checkin.services.includes(parseInt(service))) {
    filterPassenger.push(checkin.id);
    return true;
   }
  } else {
   return true;
  }
 };

 useAuthentication('staff');
 const dispatch = useDispatch();
 const [selectedFlight, setFlight] = useState('');
 const [checkedIn, setCheckedIn] = useState('');
 const [service, setService] = useState('');
 const services = useSelector((state) =>
  state.admins.services.filter((service) => {
   if (selectedFlight != '') {
    return service.flight === selectedFlight;
   } else {
    return false;
   }
  })
 );
 const flights = useSelector((state) => state.admins.flights);
 const checkInDetails = useSelector((state) => state.staffs.checkin.filter(checkinFilter));

 const passengerFilter = (passenger) => {
  if (selectedFlight != '' && service === '' && checkedIn === '') {
   return passenger.flight === selectedFlight;
  } else if (selectedFlight === '' && checkedIn === '' && service != '') {
   return filterPassenger.includes(passenger.id);
  } else if (selectedFlight === '' && checkedIn != '' && service === '') {
   return filterPassenger.includes(passenger.id);
  } else if (selectedFlight !== '' && checkedIn != '' && service === '') {
   if (passenger.flight === selectedFlight) {
    return passenger && filterPassenger.includes(passenger.id);
   }
  } else if (selectedFlight != '' && checkedIn === '' && service != '') {
   if (passenger.flight === selectedFlight) {
    return passenger && filterPassenger.includes(passenger.id);
   }
  } else if (selectedFlight === '' && checkedIn != '' && service != '') {
   return filterPassenger.includes(passenger.id);
  } else if (selectedFlight != '' && checkedIn != '' && service != '') {
   if (passenger.flight === selectedFlight) {
    return filterPassenger.includes(passenger.id);
   }
  } else {
   return passenger;
  }
 };

 const passengers = useSelector((state) => state.admins.passengers.filter(passengerFilter));

 useEffect(() => {
  dispatch(getPassengers());
  dispatch(getCheckin());
  dispatch(getServices());
  dispatch(getFlights());
 }, []);

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
       setService(e.target.value);
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
       <th>Checked In</th>
       <th>Ancillary Services</th>
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
