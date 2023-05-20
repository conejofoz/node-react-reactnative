import React from "react"; 
import { Navigate } from "react-router-dom";
//import {isauth}  from 'auth'

const ProtectedRoute = ({ children }) => {
  //const authed = isauth()
  const authed = true

  return authed ? children : <Navigate to={"/"} />
}

export default ProtectedRoute