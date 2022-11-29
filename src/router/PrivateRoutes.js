/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  return user.token ? children : <Navigate to="/authentication/sign-in" />;
}
export default PrivateRoute;
