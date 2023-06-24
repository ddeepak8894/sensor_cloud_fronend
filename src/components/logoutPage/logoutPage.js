import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  
const navigate=useNavigate()
  useEffect(() => {
    logoutUser();
  }, []);

  const logoutUser = () => {
    // Perform any logout logic here (e.g., clearing sessions, making API calls, etc.)
    // ...

    // Remove userId from local storage
    localStorage.removeItem('userId');

  };

  return (
    <div>
      <h1>Logout Page</h1>
      <p>Logging out...</p>
      <Button onClick={()=>{
        navigate("/")
      }}>Click to Login again!!!</Button>
    </div>
  );
};

export default LogoutPage;
