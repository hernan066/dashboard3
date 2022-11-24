/* For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route. */

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import PrivateRoute from "router/PrivateRoutes";
import PublicRoute from "router/PublicRoutes";

// @mui icons
import Icon from "@mui/material/Icon";
import CreateNewUser from "pages/users/new-user";
import EditUser from "pages/users/edit-user";
import ListUsers from "pages/users/list-users";
import ProfileUser from "pages/users/details-user";
import ListProducts from "pages/products/products-list";
import CreateProduct from "pages/products/product-create";
import EditProduct from "pages/products/product-edit";
import ListOferts from "pages/oferts/oferts-list";
import CreateOfert from "pages/oferts/ofert-create";
import EditOfert from "pages/oferts/ofert-edit";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: (
      <PrivateRoute>
        <ListUsers />
      </PrivateRoute>
    ),
  },
  {
    type: "collapse",
    name: "Productos",
    key: "products",
    icon: <Icon fontSize="small">shoppingCartIcon</Icon>,
    route: "/products",
    component: (
      <PrivateRoute>
        <ListProducts />
      </PrivateRoute>
    ),
  },
  {
    type: "none",
    name: "Productos",
    key: "products-create",
    icon: <Icon fontSize="small">shoppingCartIcon</Icon>,
    route: "/products/new",
    component: (
      <PrivateRoute>
        <CreateProduct />
      </PrivateRoute>
    ),
  },
  {
    type: "none",
    name: "Productos",
    key: "products-edit",
    icon: <Icon fontSize="small">shoppingCartIcon</Icon>,
    route: "/products/edit/:id",
    component: (
      <PrivateRoute>
        <EditProduct />
      </PrivateRoute>
    ),
  },
  {
    type: "collapse",
    name: "Ofertas",
    key: "ofets",
    icon: <Icon fontSize="small">loyalty</Icon>,
    route: "/oferts",
    component: (
      <PrivateRoute>
        <ListOferts /> {/* import LoyaltyIcon from '@mui/icons-material/Loyalty'; */}
      </PrivateRoute>
    ),
  },
  {
    type: "none",
    name: "Ofertas",
    key: "ofert-new",
    icon: <Icon fontSize="small">loyalty</Icon>,
    route: "/oferts/new",
    component: (
      <PrivateRoute>
        <CreateOfert />
      </PrivateRoute>
    ),
  },
  {
    type: "none",
    name: "Ofertas",
    key: "ofert-edit",
    icon: <Icon fontSize="small">loyalty</Icon>,
    route: "/oferts/edit/:id",
    component: (
      <PrivateRoute>
        <EditOfert />
      </PrivateRoute>
    ),
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: (
      <PrivateRoute>
        <Billing />
      </PrivateRoute>
    ),
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: (
      <PrivateRoute>
        <Notifications />
      </PrivateRoute>
    ),
  },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },

  {
    type: "none",
    name: "Crear usuario",
    key: "new",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/new",
    component: (
      <PrivateRoute>
        <CreateNewUser />
      </PrivateRoute>
    ),
  },
  {
    type: "none",
    name: "Editar usuario",
    key: "edit-user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/edit/:id",
    component: (
      <PrivateRoute>
        <EditUser />
      </PrivateRoute>
    ),
  },
  {
    type: "none",
    name: "Detaller usuario",
    key: "datails-user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/details/:id",
    component: (
      <PrivateRoute>
        <ProfileUser />
      </PrivateRoute>
    ),
  },

  {
    type: "none",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
];

export default routes;
