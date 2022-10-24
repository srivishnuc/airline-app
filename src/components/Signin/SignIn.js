import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
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
  <Card>
   <h1 className="fs-3">Sign In Page</h1>
   <h2 className="fs-5">Enter your Login credentials</h2>
   {error && <Alert variant="danger">Enter valid username/password</Alert>}
   <form onSubmit={login}>
    <div className="mb-3">
     <label htmlFor="username">Username:</label>
     <input
      id="username"
      className="input-text"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
     />
    </div>
    <div className="mb-3">
     <label htmlFor="password">Password:</label>
     <input
      id="password"
      className="input-text"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
     />
    </div>
    <div className="mb-3">
     <Button type="submit">Submit</Button>
    </div>
   </form>
  </Card>
 );
};

export default SignIn;
