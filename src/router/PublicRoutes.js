/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { status } = useSelector((state) => state.auth);

  return status === "authenticated" ? <Navigate to="/" /> : children;
}

export default PublicRoute;
