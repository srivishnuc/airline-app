import React from 'react';
import { Link } from 'react-router-dom';
import './AirlineStaff.scss';
import { useAuthentication } from '../../customHooks/useAuthentication';

const AirlineStaff = () => {
 useAuthentication('staff');
 return (
  <>
   <h1 className="fs-3 mt-5 text-center text-dark cursor-default">Staff Services</h1>
   <h2 className="fs-5 mt-1 text-center text-dark cursor-default">
    Choose any service to proceed further
   </h2>
   <div className="link-container d-flex justify-content-around mt-5 mb-5">
    <Link className="btn btn-outline-info m-1" to="checkin" title="Check In Link">
     Check-In
    </Link>
    <Link className="btn btn-outline-info m-1" to="inflight" title="In Flight Link">
     In-Flight
    </Link>
   </div>
  </>
 );
};

export default AirlineStaff;
