// src/components/PrivateRoute.js

import { Navigate, Outlet } from 'react-router-dom'; // Import necessary components from react-router-dom

import React from 'react'; // Import React
import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux to access the Redux store

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth); // Access userInfo from the auth slice in the Redux store
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />; // If userInfo exists, render Outlet (child routes); otherwise, navigate to login page
};

export default PrivateRoute; // Export the component as default
