import React, { useEffect, useState } from 'react';
import './AdminManageAncillary.scss';
import BackButton from '../ResusableComponents/BackButton';
import { useAuthentication } from '../../customHooks/useAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import {
 getAncillaryType,
 getAncillary,
 getFlightDetails,
 postAncillary
} from '../../Redux/Reducer/admin';
import ServiceList from './ServicesList';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

export default function AdminManageAncillary() {
 useAuthentication('admin');
 const dispatch = useDispatch();
 const admin = useSelector((state) => state.admins);
 const servicesTypes = useSelector((state) => state.admins.servicesType);
 const [isAddServices, setAddServices] = useState(false);
 const [servicesType, setServiceType] = useState(servicesTypes[0]?.id);
 const [newService, setNewService] = useState('');
 const [selectedFlight, setFlight] = useState('');
 const [isError, setError] = useState(false);

 useEffect(() => {
  dispatch(getAncillaryType());
  dispatch(getAncillary());
  dispatch(getFlightDetails());
 }, []);

 const AddServices = () => {
  if (!isAddServices) {
   setAddServices(!isAddServices);
   setFlight(admin.flights[0].name);
  } else {
   if (newService) {
    dispatch(postAncillary({ flight: selectedFlight, type: servicesType, service: newService }));
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
   <Card className="manage-ancillary">
    {isError && <Alert variant="danger">Enter Ancillary Services</Alert>}
    <p className="m-auto m-md-1 p-sm-1 fw-bold">List of Ancillary Services</p>
    <ul className="d-sm-block  d-md-flex flex-row list-unstyled">
     <li>
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
     </li>
     <li>
      {isAddServices && (
       <select
        className="form-control"
        onChange={(e) => {
         setServiceType(e.target.value);
        }}>
        {servicesTypes.map((stype) => (
         <option key={stype.id} value={stype.id}>
          {stype.type}
         </option>
        ))}
       </select>
      )}
     </li>
     <li>
      {isAddServices && (
       <input
        type="text"
        className="form-control d-inline w-50"
        onChange={(e) => {
         setError(false);
         setNewService(e.target.value);
        }}
        value={newService}
        placeholder="Enter Ancillary Services"
       />
      )}
      {isAddServices && servicesType === '01' && (
       <>
        <label className="m-1" htmlFor="meals">
         <input name="meals" type="radio" value="true" />
         Veg
        </label>
        <label className="w-25" htmlFor="meals">
         <input name="meals" type="radio" value="false" />
         Non-Veg
        </label>
       </>
      )}
     </li>
     <li>
      <span>
       <button className="btn btn-outline-primary" onClick={AddServices}>
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
     </li>
    </ul>
    <ul className="d-none d-sm-none d-md-flex flex-row list-unstyled fw-bold">
     <li>Flight Name</li>
     <li>Type</li>
     <li>services</li>
     <li>Modify </li>
    </ul>
    {admin.services.map((ser) => (
     <ServiceList
      key={ser.id}
      id={ser.id}
      flight={ser.flight}
      service={ser.service}
      serviceTypes={servicesTypes?.find((service) => service.id === ser.type)}
      setError={setError}
     />
    ))}
   </Card>
  </>
 );
}
