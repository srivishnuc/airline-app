import React, { useEffect, useState } from 'react';
import './AdminManagePassenger.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { getPassengers, getFlightDetails, postPassenger } from '../../Redux/Reducer/admin';
import { useDispatch, useSelector } from 'react-redux';
import PassengerList from './PassengerList';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const AdminManagePassenger = () => {
 useAuthentication('admin');
 const dispatch = useDispatch();
 const [isAddPassenger, setAddPassenger] = useState(false);
 const [name, setName] = useState('');
 const [passNo, setPassNo] = useState('');
 const [address, setAddress] = useState('');
 const [dob, setDob] = useState('');
 const [selectedFlight, setFlight] = useState('');
 const [isError, setError] = useState(false);
 const [addPassengerError, setAddPassengerError] = useState(false);
 const [filterPass, setFilterPass] = useState(false);
 const [filterAddress, setFilterAddress] = useState(false);
 const [filterDob, setFilterDob] = useState(false);
 const flights = useSelector((state) => state.admins.flights);
 let passengers = useSelector((state) => state.admins.passengers);

 if (filterPass) {
  passengers = passengers.filter((passenger) => passenger.passportNo == '');
 }

 if (filterAddress) {
  passengers = passengers.filter((passenger) => passenger.address == '');
 }

 if (filterDob) {
  passengers = passengers.filter((passenger) => passenger.dob == '');
 }

 useEffect(() => {
  dispatch(getPassengers());
  dispatch(getFlightDetails());
 }, []);

 const addPassenger = () => {
  if (!isAddPassenger) {
   setAddPassenger(true);
   setFlight(flights[0].name);
  } else {
   if (name) {
    dispatch(
     postPassenger({
      flight: selectedFlight,
      name,
      passportNo: passNo,
      address,
      dob,
      checkin: { isCheckedIn: 'N', services: [], seatno: 'S' }
     })
    );
    setAddPassenger(false);
    setError(false);
    setName('');
    setPassNo('');
    setAddress('');
    setDob('');
   } else {
    setAddPassengerError(true);
   }
  }
 };

 const cancelAdd = () => {
  setAddPassengerError(false);
  setAddPassenger(false);
  setName('');
  setPassNo('');
  setAddress('');
 };
 return (
  <>
   <BackButton />
   <h1 className="fs-3 text-center text-dark">Manage Passenger</h1>
   <h2 className="fs-5 text-center text-dark">Passengers List</h2>
   <Card className="filter-missing-details">
    <h3>Filter missing details</h3>
    <label htmlFor="passno">
     <input
      id="passno"
      type="checkbox"
      onChange={(e) => {
       setFilterPass(!filterPass);
      }}
      value={filterPass}
     />
     <strong>&nbsp;Passport No</strong>
    </label>
    <label htmlFor="address">
     <input
      id="address"
      type="checkbox"
      onChange={(e) => {
       setFilterAddress(!filterAddress);
      }}
      value={filterAddress}
     />
     <strong>&nbsp;Address</strong>
    </label>
    <label htmlFor="dob">
     <input
      id="dob"
      type="checkbox"
      onChange={(e) => {
       setFilterDob(!filterDob);
      }}
      value={filterDob}
     />
     <strong>&nbsp;DateOfBirth</strong>
    </label>
   </Card>
   <Card className="manage-passenger table-responsive">
    {addPassengerError && <Alert variant="danger">Enter Passenger name</Alert>}
    {isError && <Alert variant="danger">Enter all required passenger details</Alert>}
    <Table striped>
     <caption>List of passengers</caption>
     <thead>
      <tr>
       <td>
        {!isAddPassenger && <Link to="/admin/ancillary">Add Services Here</Link>}
        {isAddPassenger && (
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
        )}
       </td>
       <td>
        {isAddPassenger && (
         <input
          type="text"
          className="form-control w-75"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
         />
        )}
       </td>
       <td>
        {isAddPassenger && (
         <input
          type="date"
          className="form-control w-75"
          placeholder="DateOfBirth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
         />
        )}
       </td>
       <td>
        {isAddPassenger && (
         <input
          type="text"
          className="form-control w-75"
          placeholder="Passport No"
          value={passNo}
          onChange={(e) => setPassNo(e.target.value)}
         />
        )}
       </td>
       <td>
        {isAddPassenger && (
         <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
         />
        )}
       </td>
       <td>
        <span>
         <button className="btn btn-outline-primary" onClick={addPassenger}>
          {isAddPassenger ? 'Add' : 'Add Passenger'}
         </button>
        </span>
        {isAddPassenger && (
         <span>
          <button className="btn btn-cancel btn-outline-danger" onClick={cancelAdd}>
           &nbsp;Cancel
          </button>
         </span>
        )}
       </td>
      </tr>
      <tr>
       <th>Flight</th>
       <th>Name</th>
       <th>DOB</th>
       <th>Passport No</th>
       <th>Address</th>
       <th>Modify</th>
      </tr>
     </thead>
     <tbody>
      {passengers.map((plst) => (
       <PassengerList
        key={plst.id}
        id={plst.id}
        name={plst.name}
        flight={plst.flight}
        address={plst.address}
        passno={plst.passportNo}
        dob={plst.dob}
        setError={setError}
       />
      ))}
     </tbody>
    </Table>
   </Card>
  </>
 );
};

export default AdminManagePassenger;
