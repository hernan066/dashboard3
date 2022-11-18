/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-spacing */

import Billing from "layouts/billing";
import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";


function AppRouter() {
  return (
    <Routes>
      {/* public */}
      <Route path="/authentication/sign-in"element={    <PublicRoute> <SignIn /> </PublicRoute>}/>
      {/* private */}
      <Route path="/" element={                    <Dashboard />       }/>
      <Route path="/billing" element={             <Billing />        } />
      <Route path="/notifications" element={       <Notifications />  } />
      <Route path="/profile" element={            <Profile />        } />
      
     

      <Route path="/users" element={              <Tables />        } key="users"/>
      {/* <Route path="/users/new" element={          <PrivateRoute> <UserCreate />     </PrivateRoute>} />
      <Route path="/users/edit/:id" element={     <PrivateRoute> <UserEdit />       </PrivateRoute>} />
      <Route path="/users/details/:id" element={  <PrivateRoute> <UserDetails/>     </PrivateRoute>} /> */}
      {/*  <Route path="*" element={<Navigate to="/dashboard" />} /> */}
    </Routes>
  )
}

export default AppRouter;
