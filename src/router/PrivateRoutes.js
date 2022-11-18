/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { status } = useSelector((state) => state.auth);

  return status === "authenticated" ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
