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
  if (user[0].authorization === 'staff') navigate('/staff');
  else navigate('/admin');
 };
 return (
  <header className="header">
   <div className="fs-1 text-white fw-bold" onClick={handleNavigate}>
    <img src={logo} alt="Airlines logo" width="50rem" height="50rem" /> SV Airline
   </div>
   <Logout />
  </header>
 );
};

export default Header;
