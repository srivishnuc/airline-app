import React, { useEffect, useState } from 'react';
import './AdminManageAncillary.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import { getServices, getFlights, postAncillary } from '../../Redux/Reducer/admin';
import ServiceList from './ServicesList';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const AdminManageAncillary = () => {
 useAuthentication('admin');
 const dispatch = useDispatch();
 const admin = useSelector((state) => state.admins);
 const [isAddServices, setAddServices] = useState(false);
 const [newService, setNewService] = useState('');
 const [selectedFlight, setFlight] = useState('');
 const [isError, setError] = useState(false);

 useEffect(() => {
  dispatch(getServices());
  dispatch(getFlights());
 }, []);

 const AddServices = () => {
  if (!isAddServices) {
   setAddServices(!isAddServices);
   setFlight(admin.flights[0].name);
  } else {
   if (newService) {
    dispatch(postAncillary({ flight: selectedFlight, service: newService }));
    setNewService('');
    setAddServices(!isAddServices);
   } else {
    setError(true);
   }
  }
 };

 const cancelAdd = () => {
  setAddServices(false);
  setNewService('');
  setError(false);
 };

 return (
  <>
   <BackButton />
   <h1 className="fs-3 text-dark text-center">Manage Ancillary Services</h1>
   <h2 className="fs-5 text-dark text-center">Ancillary Services List</h2>
   <Card className="manage-ancillary table-responsive">
    {isError && <Alert variant="danger">Enter Ancillary Services</Alert>}
    <Table striped>
     <caption>List of Ancillary Services</caption>
     <thead>
      <tr>
       <td>
        {isAddServices && (
         <select
          className="form-control"
          onChange={(e) => {
           setFlight(e.target.value);
          }}>
          {admin.flights.map((flight) => (
           <option key={flight.id} value={flight.value}>
            {flight.name}
           </option>
          ))}
         </select>
        )}
       </td>
       <td>
        {isAddServices && (
         <input
          type="text"
          className="form-control"
          onChange={(e) => {
           setError(false);
           setNewService(e.target.value);
          }}
          value={newService}
          placeholder="Enter Ancillary Services"
         />
        )}
       </td>
       <td>
        <span>
         <button className="btn btn-outline-info" onClick={AddServices}>
          {isAddServices ? 'Add' : 'Add Service'}
         </button>
        </span>
        &nbsp;{' '}
        {isAddServices && (
         <span>
          <button className="btn btn-outline-danger" onClick={cancelAdd}>
           &nbsp;Cancel
          </button>
         </span>
        )}
       </td>
      </tr>
      <tr>
       <th>Flight Name</th>
       <th>Ancillary services</th>
       <th>Modify </th>
      </tr>
     </thead>
     <tbody>
      {admin.services.map((ser) => (
       <ServiceList
        key={ser.id}
        id={ser.id}
        flight={ser.flight}
        service={ser.service}
        setError={setError}
       />
      ))}
     </tbody>
    </Table>
   </Card>
  </>
 );
};

export default AdminManageAncillary;
