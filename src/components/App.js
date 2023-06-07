import React from 'react';
import './App.scss';
import Header from './ResusableComponents/Header';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import AirlineStaff from './AirlineStaff/AirlineStaff';
import AirlineAdmin from './AirlineAdmin/AirlineAdmin';
import StaffCheckIn from './StaffCheckIn/StaffCheckIn';
import StaffInFlight from './StaffInFlight/StaffInFlight';
import AdminManagePassenger from './AdminManagePassenger/AdminManagePassenger';
import AdminManageAncillary from './AdminManageAncillary/AdminManageAncillary';
import Footer from './Footer/Footer';

const App = () => {
 return (
  <div className="container-fluid d-flex flex-column justify-content-between h-100">
   <Header />
   <main className="content">
    <Routes>
     <Route path="/" element={<Login />} />
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
   <Footer />
  </div>
 );
};

export default App;
