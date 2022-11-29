/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  return user.token ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute;
