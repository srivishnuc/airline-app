import React from 'react';
import './Header.scss';
import logo from '../../../public/images/logo.png';
import Logout from '../Logout/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
 const user = useSelector((state) => state.users.user);
 const navigate = useNavigate();
 const handleNavigate = () => {
  if (user.length) {
   if (user[0].authorization === 'staff') navigate('/staff');
   else navigate('/admin');
  }
 };
 return (
  <header className="row bg-info text-center sticky-top">
   <div
    className="row no-gutters col-12  align-items-center fs-1 text-white fw-bold"
    onClick={handleNavigate}>
    <img
     className="col-2 col-md-1 align-middle"
     role="button"
     src={logo}
     alt="Airlines logo"
     height="50"
     width="50"
    />
    <span className="col-8 col-md-10 text-dark cursor-default">SV Airline</span>
    <Logout />
   </div>
  </header>
 );
};

export default Header;
