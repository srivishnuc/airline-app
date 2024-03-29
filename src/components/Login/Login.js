import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../Redux/Reducer/user';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import googleIcon from '../../../public/images/google.svg';

const Login = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(false);
 const dispatch = useDispatch();
 const navigation = useNavigate();

 const login = useGoogleLogin({
  onSuccess: async (response) => {
   const responseData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${response.access_token}` }
   });
   setUsername(responseData?.data?.email);
   userLogin();
  }
 });

 const userLogin = async () => {
  if (username) {
   const loginUser = () =>
    new Promise((resolve) => {
     resolve(dispatch(getUsers({ username, password })));
    });
   setUsername('');
   setPassword('');

   const checkLogin = await loginUser();
   localStorage.setItem('username', checkLogin.payload[0].username);
   localStorage.setItem('usertype', checkLogin.payload[0].userType);
   if (localStorage.getItem('usertype') === 'admin') {
    navigation('/admin');
   } else if (localStorage.getItem('usertype') === 'staff') {
    navigation('/staff');
   } else {
    setError(true);
    setTimeout(() => {
     setError(false);
    }, 5000);
   }
  } else {
   setError(true);
   setTimeout(() => {
    setError(false);
   }, 5000);
  }
 };

 return (
  <div className="login row justify-content-center vh-75">
   <div className="col-12 col-md-8 col-xl-4 mt-3 align-items-center">
    <h1 className="fs-3 mt-3 text-dark text-center cursor-default">Sign In Page</h1>
    <h2 className="fs-5 text-center cursor-default">Enter your Login credentials</h2>
    {error && <Alert variant="danger">Enter valid username/password</Alert>}
    <form className="mt-5">
     <div className="mb-3">
      <label className="w-50" htmlFor="username">
       Username
      </label>
      <input
       id="username"
       className="form-control input-text mt-1"
       type="text"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       placeholder="Username"
      />
     </div>
     <div className="mb-3">
      <label className="w-50" htmlFor="password">
       Password
      </label>
      <input
       id="password"
       className="form-control input-text mt-1"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       placeholder="Password"
      />
     </div>

     <div className="mt-5 d-flex justify-content-between">
      <Button onClick={() => login()} className="d-flex align-items-center">
       <img className="googleIcon" alt="google-icon" src={googleIcon} height="20" width="20" />
       <span>&nbsp;Sign in with Google</span>
      </Button>
      <Button type="button" onClick={userLogin}>
       Login
      </Button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default Login;
