import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthentication = (checkurl) => {
 const usertype = localStorage.getItem('usertype');
 const navigate = useNavigate();
 useEffect(() => {
  if (usertype !== checkurl) {
   navigate('/');
  }
 });
};
