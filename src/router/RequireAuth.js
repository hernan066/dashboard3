/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "redux/authSlice";

const RequireAuth = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/authentication/sign-in" state={{ from: location }} replace />
  );
};
export default RequireAuth;
