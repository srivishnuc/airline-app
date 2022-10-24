import React from 'react';
import './App.scss';
import Header from './Header/Header';
import { Routes, Route } from 'react-router-dom';
import SignIn from './Signin/SignIn';
import AirlineStaff from './AirlineStaff/AirlineStaff';
import AirlineAdmin from './AirlineAdmin/AirlineAdmin';
import StaffCheckIn from './StaffCheckIn/StaffCheckIn';
import StaffInFlight from './StaffInFlight/StaffInFlight';
import AdminManagePassenger from './AdminManagePassenger/AdminManagePassenger';
import AdminManageAncillary from './AdminManageAncillary/AdminManageAncillary';

const App = () => {
 return (
  <div className="container-fluid">
   <Header />
   <main>
    <Routes>
     <Route path="/" element={<SignIn />} />
     <Route path="staff">
      <Route index element={<AirlineStaff />} />
      <Route path="checkin" element={<StaffCheckIn />} />
      <Route path="inflight" element={<StaffInFlight />} />
     </Route>
     <Route path="admin">
      <Route index element={<AirlineAdmin />} />
      <Route path="passenger" element={<AdminManagePassenger />} />
      <Route path="ancillary" element={<AdminManageAncillary />} />
     </Route>
    </Routes>
   </main>
   <footer className="bg-light text-center text-lg-start mt-3">
    <div className="text-center p-3">&copy; 2022 Copyright: SV Airlines</div>
   </footer>
  </div>
 );
};

export default App;
