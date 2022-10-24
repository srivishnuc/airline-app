import React from 'react';
import logout from '../../../public/images/logout.png';
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
 return <img onClick={handleLogout} src={logout} alt="logo" width="50rem" height="50rem" />;
};

export default Logout;
