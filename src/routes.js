import Dashboard from "layouts/dashboard";
import CreateNewUser from "pages/users/new-user";
import EditUser from "pages/users/edit-user";
import ListUsers from "pages/users/list-users";
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
import CreateNewClient from "pages/clients/create-clients";
import EditClient from "pages/clients/edit-clients";
import ListClientAddress from "pages/clientsAddress/list-clientAddress";
import CreateNewClientAddress from "pages/clientsAddress/create-clientAddress";
import EditClientAddress from "pages/clientsAddress/edit-clientAddress";
import ListDeliverySubZone from "pages/deliverySubZone/list-deliverySubZone";
import CreateNewSubDeliveryZone from "pages/deliverySubZone/create-deliverySubZone";

const routes = [
  {
    route: "/dashboard",
    component: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },

  /* usuario */
  {
    route: "/usuarios/lista",
    component: (
      <RequireAuth>
        <ListUsers />
      </RequireAuth>
    ),
  },
  {
    route: "/usuarios/nuevo",
    component: (
      <RequireAuth>
        <CreateNewUser />
      </RequireAuth>
    ),
  },
  {
    route: "/usuarios/editar/:id",
    component: (
      <RequireAuth>
        <EditUser />
      </RequireAuth>
    ),
  },
  /* Productos */

  {
    route: "/productos/lista",
    component: (
      <RequireAuth>
        <ListProducts />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/nuevo",
    component: (
      <RequireAuth>
        <CreateProduct />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/editar/:id",
    component: (
      <RequireAuth>
        <EditProduct />
      </RequireAuth>
    ),
  },
  /* Proveedores */

  {
    route: "/productos/proveedores/lista",
    component: (
      <RequireAuth>
        <ListSuppliers />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/proveedores/nuevo",
    component: (
      <RequireAuth>
        <CreateNewSupplier />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/proveedores/editar/:id",
    component: (
      <RequireAuth>
        <EditSupplier />
      </RequireAuth>
    ),
  },

  /* Ofertas */
  {
    route: "/productos/ofertas/lista",
    component: (
      <RequireAuth>
        <ListOferts />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/ofertas/nueva",
    component: (
      <RequireAuth>
        <CreateOfert />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/ofertas/editar/:id",
    component: (
      <RequireAuth>
        <EditOfert />
      </RequireAuth>
    ),
  },
  /* Stock */

  {
    route: "/productos/stock/lista",
    component: (
      <RequireAuth>
        <ListProductsLots />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/stock/nuevo",
    component: (
      <RequireAuth>
        <CreateProductsLots />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/stock/editar/:id",
    component: (
      <RequireAuth>
        <EditProductsLots />
      </RequireAuth>
    ),
  },

  /* Clientes */

  {
    route: "/clientes/lista",
    component: (
      <RequireAuth>
        <ListClients />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/nuevo",
    component: (
      <RequireAuth>
        <CreateNewClient />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/editar/:id",
    component: (
      <RequireAuth>
        <EditClient />
      </RequireAuth>
    ),
  },

  /* Direcciones clientes */
  {
    route: "/clientes/direcciones/lista",
    component: (
      <RequireAuth>
        <ListClientAddress />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/direcciones/nuevo",
    component: (
      <RequireAuth>
        <CreateNewClientAddress />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/direcciones/editar/:id",
    component: (
      <RequireAuth>
        <EditClientAddress />
      </RequireAuth>
    ),
  },

  /* Ordenes */
  {
    route: "/ordenes/lista",
    component: (
      <RequireAuth>
        <ListOrders />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/detalle/:id",
    component: (
      <RequireAuth>
        <OrderDetails />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/nueva",
    component: (
      <RequireAuth>
        <OrderCreate />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/editar/:id",
    component: (
      <RequireAuth>
        <OrderEdit />
      </RequireAuth>
    ),
  },
  /* Zonas reparto */
  {
    route: "/distribucion/zonas/lista",
    component: (
      <RequireAuth>
        <ListDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/zonas/nueva",
    component: (
      <RequireAuth>
        <CreateNewDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/zonas/editar/:id",
    component: (
      <RequireAuth>
        <EditDeliveryZone />
      </RequireAuth>
    ),
  },
  /* Sub Zonas reparto */
  {
    route: "/distribucion/sub-zonas/lista",
    component: (
      <RequireAuth>
        <ListDeliverySubZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/sub-zonas/nueva",
    component: (
      <RequireAuth>
        <CreateNewSubDeliveryZone />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/sub-zonas/editar/:id",
    component: (
      <RequireAuth>
        <EditDeliveryZone />
      </RequireAuth>
    ),
  },

  /* Distribuidoras */
  {
    route: "/distribucion/distribuidoras/lista",
    component: (
      <RequireAuth>
        <ListDistributors />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/distribuidoras/nueva",
    component: (
      <RequireAuth>
        <CreateNewDistributor />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/distribuidoras/editar/:id",
    component: (
      <RequireAuth>
        <EditDistributor />
      </RequireAuth>
    ),
  },

  /* Repartidores */
  {
    route: "/distribucion/repartidores/lista",
    component: (
      <RequireAuth>
        <ListDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/repartidores/nuevo",
    component: (
      <RequireAuth>
        <CreateDeliveryTruck />
      </RequireAuth>
    ),
  },
  {
    route: "/distribucion/repartidores/editar/:id",
    component: (
      <RequireAuth>
        <EditDeliveryTruck />
      </RequireAuth>
    ),
  },
];

export default routes;
