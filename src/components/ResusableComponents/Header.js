import React from 'react';
import logo from '../../../public/images/logo.png';
import Logout from '../Logout/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
 const user = useSelector((state) => state.users.user);
 const navigate = useNavigate();
 const handleNavigate = () => {
  if (user.length) {
   if (user[0].userType === 'staff') navigate('/staff');
   else navigate('/admin');
  }
 };
 return (
  <header className="header-container row bg-info text-center sticky-top">
   <div
    className="row no-gutters col-12  align-items-center fs-1 text-white fw-bold"
    onClick={handleNavigate}>
    <img
     className="col-2 col-md-1 align-middle"
     src={logo}
     alt="Airlines logo"
     height="50"
     width="50"
    />
    <span role="text" className="col-8 col-md-10 text-dark cursor-default">
     SV Airlines
    </span>
    <Logout />
   </div>
  </header>
 );
};

export default Header;
