import React from 'react';
import './AirlineAdmin.scss';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../customHooks/useAuthentication';

const AirlineAdmin = () => {
 useAuthentication('admin');
 return (
  <>
   <h1 className="fs-3 mt-5 text-center text-dark cursor-default">Admin Services</h1>
   <h2 className="fs-5 mt-1 text-center text-dark cursor-default">
    Choose any service to proceed further
   </h2>
   <div className="link-container d-flex justify-content-around mt-5 mb-5">
    <Link className="btn btn-outline-info" to="passenger" title="Manage Passenger Link">
     Manage passenger
    </Link>
    <Link className="btn btn-outline-info" to="ancillary" title="Ancillary Services Link">
     Flight ancillary Services
    </Link>
   </div>
  </>
 );
};

export default AirlineAdmin;
