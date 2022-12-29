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

// import SignIn from "layouts/authentication/sign-in";

// import PublicRoute from "router/PublicRoutes";

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
import RequireAuth from "router/RequireAuth";
import ListSuppliers from "pages/suppliers/list-suppliers";
import ListProductsLots from "pages/productsLots/list-productsLots";
import CreateNewSupplier from "pages/suppliers/create-suppliers";
import EditSupplier from "pages/suppliers/edit-suppliers";
import CreateProductsLots from "pages/productsLots/create-productsLots";
import EditProductsLots from "pages/productsLots/edit-productsLots";
import ListOrders from "pages/orders/order-list";
import OrderDetails from "pages/orders/order-datails";
import OrderCreate from "pages/orders/order-create";
import OrderEdit from "pages/orders/order-edit";
import ListDeliveryZone from "pages/deliveryZone/list-deliveryZone";
import CreateNewDeliveryZone from "pages/deliveryZone/create-deliveryZone";
import EditDeliveryZone from "pages/deliveryZone/edit-deliveryZone";
import ListDistributors from "pages/distributor/list-distributors";
import ListDeliveryTruck from "pages/deliveryTruck/list-deliveryTruck";
import CreateNewDistributor from "pages/distributor/create-distributors";
import EditDistributor from "pages/distributor/edit-distributors";
import CreateDeliveryTruck from "pages/deliveryTruck/create-deliveryTruck";
import EditDeliveryTruck from "pages/deliveryTruck/edit-deliveryTruck";
import ListClients from "pages/clients/list-clients";
import AddUserAddress from "pages/users/add-address";
import CreateNewClient from "pages/clients/create-clients";
import EditClient from "pages/clients/edit-clients";
import ListClientAddress from "pages/clientsAddress/list-clientAddress";
import CreateNewClientAddress from "pages/clientsAddress/create-clientAddress";
import EditClientAddress from "pages/clientsAddress/edit-clientAddress";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: (
      <RequireAuth>
        <ListUsers />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Productos",
    key: "products",
    icon: <Icon fontSize="small">shoppingCartIcon</Icon>,
    route: "/products",
    component: (
      <RequireAuth>
        <ListProducts />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Productos",
    key: "products-create",
    icon: <Icon fontSize="small">shoppingCartIcon</Icon>,
    route: "/products/new",
    component: (
      <RequireAuth>
        <CreateProduct />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Productos",
    key: "products-edit",
    icon: <Icon fontSize="small">shoppingCartIcon</Icon>,
    route: "/products/edit/:id",
    component: (
      <RequireAuth>
        <EditProduct />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Ofertas",
    key: "ofets",
    icon: <Icon fontSize="small">loyalty</Icon>,
    route: "/oferts",
    component: (
      <RequireAuth>
        <ListOferts /> {/* import LoyaltyIcon from '@mui/icons-material/Loyalty'; */}
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Ofertas",
    key: "ofert-new",
    icon: <Icon fontSize="small">loyalty</Icon>,
    route: "/oferts/new",
    component: (
      <RequireAuth>
        <CreateOfert />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Ofertas",
    key: "ofert-edit",
    icon: <Icon fontSize="small">loyalty</Icon>,
    route: "/oferts/edit/:id",
    component: (
      <RequireAuth>
        <EditOfert />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Proveedores",
    key: "suppliers",
    icon: <Icon fontSize="small">factory</Icon>,
    route: "/suppliers",
    component: (
      <RequireAuth>
        <ListSuppliers />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Proveedores",
    key: "suppliers_new",
    icon: <Icon fontSize="small">factory</Icon>,
    route: "/suppliers/new",
    component: (
      <RequireAuth>
        <CreateNewSupplier />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Proveedores",
    key: "suppliers_edit",
    icon: <Icon fontSize="small">factory</Icon>,
    route: "/suppliers/edit/:id",
    component: (
      <RequireAuth>
        <EditSupplier />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Stock",
    key: "products_lots",
    icon: (
      <Icon fontSize="small">list_alt</Icon>
    ) /* import ListAltIcon from '@mui/icons-material/ListAlt'; */,
    route: "/products_lots",
    component: (
      <RequireAuth>
        <ListProductsLots />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Lote de productos",
    key: "products_lots_create",
    icon: (
      <Icon fontSize="small">list_alt</Icon>
    ) /* import ListAltIcon from '@mui/icons-material/ListAlt'; */,
    route: "/products_lots/new",
    component: (
      <RequireAuth>
        <CreateProductsLots />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Lote de productos",
    key: "products_lots_edit",
    icon: (
      <Icon fontSize="small">list_alt</Icon>
    ) /* import ListAltIcon from '@mui/icons-material/ListAlt'; */,
    route: "/products_lots/edit/:id",
    component: (
      <RequireAuth>
        <EditProductsLots />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Ordenes",
    key: "orders",
    icon: (
      <Icon fontSize="small">view_list_icon</Icon>
    ) /* import ViewListIcon from '@mui/icons-material/ViewList'; */,
    route: "/orders",
    component: (
      <RequireAuth>
        <ListOrders />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Ordenes",
    key: "orders_details",
    icon: (
      <Icon fontSize="small">view_list_icon</Icon>
    ) /* import ViewListIcon from '@mui/icons-material/ViewList'; */,
    route: "/orders/details/:id",
    component: (
      <RequireAuth>
        <OrderDetails />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Ordenes",
    key: "orders_details",
    icon: (
      <Icon fontSize="small">view_list_icon</Icon>
    ) /* import ViewListIcon from '@mui/icons-material/ViewList'; */,
    route: "/orders/new",
    component: (
      <RequireAuth>
        <OrderCreate />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Ordenes",
    key: "orders_edit",
    icon: (
      <Icon fontSize="small">view_list_icon</Icon>
    ) /* import ViewListIcon from '@mui/icons-material/ViewList'; */,
    route: "/orders/edit/:id",
    component: (
      <RequireAuth>
        <OrderEdit />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Zonas de reparto",
    key: "delivery_zone",
    icon: (
      <Icon fontSize="small">home_work_icon</Icon>
    ) /* import HomeWorkIcon from '@mui/icons-material/HomeWork'; */,
    route: "/delivery_zone",
    component: (
      <RequireAuth>
        <ListDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Zonas de reparto",
    key: "delivery_zone_create",
    icon: (
      <Icon fontSize="small">home_work_icon</Icon>
    ) /* import HomeWorkIcon from '@mui/icons-material/HomeWork'; */,
    route: "/delivery_zone/new",
    component: (
      <RequireAuth>
        <CreateNewDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Zonas de reparto",
    key: "delivery_zone_edit",
    icon: (
      <Icon fontSize="small">home_work_icon</Icon>
    ) /* import HomeWorkIcon from '@mui/icons-material/HomeWork'; */,
    route: "/delivery_zone/edit/:id",
    component: (
      <RequireAuth>
        <EditDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Distribuidoras",
    key: "distributors",
    icon: (
      <Icon fontSize="small">store_icon</Icon>
    ) /* import StoreIcon from '@mui/icons-material/Store'; */,
    route: "/distributors",
    component: (
      <RequireAuth>
        <ListDistributors />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Distribuidoras",
    key: "distributors_create",
    icon: (
      <Icon fontSize="small">store_icon</Icon>
    ) /* import StoreIcon from '@mui/icons-material/Store'; */,
    route: "/distributors/new",
    component: (
      <RequireAuth>
        <CreateNewDistributor />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Distribuidoras",
    key: "distributors_edit",
    icon: (
      <Icon fontSize="small">store_icon</Icon>
    ) /* import StoreIcon from '@mui/icons-material/Store'; */,
    route: "/distributors/edit/:id",
    component: (
      <RequireAuth>
        <EditDistributor />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Repartidores",
    key: "delivery_truck",
    icon: (
      <Icon fontSize="small">local_shipping_icon</Icon>
    ) /* import LocalShippingIcon from '@mui/icons-material/LocalShipping'; */,
    route: "/delivery_trucks",
    component: (
      <RequireAuth>
        <ListDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Repartidores",
    key: "delivery_truck_new",
    icon: (
      <Icon fontSize="small">local_shipping_icon</Icon>
    ) /* import LocalShippingIcon from '@mui/icons-material/LocalShipping'; */,
    route: "/delivery_trucks/new",
    component: (
      <RequireAuth>
        <CreateDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Repartidores",
    key: "delivery_truck_edit",
    icon: (
      <Icon fontSize="small">local_shipping_icon</Icon>
    ) /* import LocalShippingIcon from '@mui/icons-material/LocalShipping'; */,
    route: "/delivery_trucks/edit/:id",
    component: (
      <RequireAuth>
        <EditDeliveryTruck />
      </RequireAuth>
    ),
  },

  {
    type: "none",
    name: "Crear usuario",
    key: "new",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/new",
    component: (
      <RequireAuth>
        <CreateNewUser />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Editar usuario",
    key: "edit-user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/edit/:id",
    component: (
      <RequireAuth>
        <EditUser />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Editar usuario",
    key: "address-user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/address/:id",
    component: (
      <RequireAuth>
        <AddUserAddress />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Detaller usuario",
    key: "datails-user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users/details/:id",
    component: (
      <RequireAuth>
        <ProfileUser />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Clientes",
    key: "clients",
    icon: (
      <Icon fontSize="small">perm_contact_calendar_icon</Icon>
    ) /* import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'; */,
    route: "/clients",
    component: (
      <RequireAuth>
        <ListClients />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Clientes",
    key: "clients_new",
    icon: (
      <Icon fontSize="small">perm_contact_calendar_icon</Icon>
    ) /* import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'; */,
    route: "/client/new",
    component: (
      <RequireAuth>
        <CreateNewClient />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Clientes",
    key: "clients_edit",
    icon: (
      <Icon fontSize="small">perm_contact_calendar_icon</Icon>
    ) /* import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'; */,
    route: "/client/edit/:id",
    component: (
      <RequireAuth>
        <EditClient />
      </RequireAuth>
    ),
  },
  {
    type: "collapse",
    name: "Direcciones de clientes",
    key: "clients_address",
    icon: (
      <Icon fontSize="small">holiday_village_icon</Icon>
    ) /* import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'; */,
    route: "/client_address",
    component: (
      <RequireAuth>
        <ListClientAddress />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Direcciones de clientes",
    key: "clients_address_new",
    icon: (
      <Icon fontSize="small">holiday_village_icon</Icon>
    ) /* import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'; */,
    route: "/client_address/new",
    component: (
      <RequireAuth>
        <CreateNewClientAddress />
      </RequireAuth>
    ),
  },
  {
    type: "none",
    name: "Direcciones de clientes",
    key: "clients_address_edit",
    icon: (
      <Icon fontSize="small">holiday_village_icon</Icon>
    ) /* import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'; */,
    route: "/client_address/edit/:id",
    component: (
      <RequireAuth>
        <EditClientAddress />
      </RequireAuth>
    ),
  },
];

export default routes;
