import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../Redux/Reducer/user';
import './SignIn.scss';

const SignIn = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(false);
 const dispatch = useDispatch();
 const navigation = useNavigate();

 const login = async (e) => {
  e.preventDefault();
  if (username.length) {
   const loginUser = () =>
    new Promise((resolve) => {
     resolve(dispatch(getUsers({ username, password })));
    });
   setUsername('');
   setPassword('');

   const checkLogin = await loginUser();
   if (checkLogin && checkLogin.payload.length && checkLogin.payload[0].authorization === 'admin') {
    navigation('/admin');
   } else if (
    checkLogin &&
    checkLogin.payload.length &&
    checkLogin.payload[0].authorization === 'staff'
   ) {
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
  <div className="row justify-content-center">
   <div className="col-3 mt-3 align-items-center">
    <h1 className="fs-3 mt-3 text-dark text-center cursor-default">Sign In Page</h1>
    <h2 className="fs-5 text-center cursor-default">Enter your Login credentials</h2>
    {error && <Alert variant="danger">Enter valid username/password</Alert>}
    <form className="mt-5" onSubmit={login}>
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
     <div className="mt-5 d-flex justify-content-end">
      <Button type="submit">Login</Button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default SignIn;
