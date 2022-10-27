import React from 'react';
import logout from '../../../public/images/log-out.svg';
import { useNavigate } from 'react-router-dom';
import { LOGOUT as userLogout } from '../../Redux/Reducer/user';
import { useDispatch } from 'react-redux';
const Logout = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const handleLogout = () => {
  dispatch(userLogout());
  navigate('/');
 };
 return (
  <img
   className="col-2 col-md-1 align-items-start"
   onClick={handleLogout}
   src={logout}
   alt="log out"
   height="40"
   width="40"
  />
 );
};

export default Logout;
