import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


const ProtectedRoute = ({ children, role }) => {


  const { user, token } = useAuth();


  



  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }



  if (
    role &&
    user?.role?.toLowerCase() !== role.toLowerCase()
  ) {


    return (
      <Navigate
        to="/login"
        replace
      />
    );


  }



  return children;


};


export default ProtectedRoute;