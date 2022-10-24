import React from 'react';
import { Link } from 'react-router-dom';
import './AirlineStaff.scss';
import { useAuthentication } from '../../customHooks/useAuthentication';

const AirlineStaff = () => {
 useAuthentication('staff');
 return (
  <>
   <h1 className="fs-3">Staff Services</h1>
   <h2 className="fs-5">Choose any service to proceed further</h2>
   <div className="link-container">
    <Link className="link text-info bg-dark" to="checkin" title="Check In Link">
     Check-In
    </Link>
    <Link className="link text-info bg-dark" to="inflight" title="In Flight Link">
     In-Flight
    </Link>
   </div>
  </>
 );
};

export default AirlineStaff;
