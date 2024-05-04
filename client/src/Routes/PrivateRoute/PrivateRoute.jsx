import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useCurrentToken } from "../../Redux/features/auth/authSlice";
import { useSelector } from "react-redux";
// import { AuthContext } from "../../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  // const { user, loading, userInfoFromDb } = useContext(AuthContext);
  const token = useSelector(useCurrentToken);
  const location = useLocation();

  // if (loading) {
  //   return <progress className="progress w-56"></progress>;
  // }

  if (token) {
    return children;
  }

  return (
    <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;
