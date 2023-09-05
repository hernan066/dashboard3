import CreateNewUser from "pages/users/new-user";
import EditUser from "pages/users/edit-user";
import ListUsers from "pages/users/list-users";
import CreateProduct from "pages/products/product-create";
import ListOferts from "pages/oferts/oferts-list";
import CreateOfert from "pages/oferts/ofert-create";
import EditOfert from "pages/oferts/ofert-edit";
import RequireAuth from "router/RequireAuth";
import ListSuppliers from "pages/suppliers/list-suppliers";
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
import EditDeliverySubZone from "pages/deliverySubZone/edit-deliverySubZone";
import EditPasswordUser from "pages/users/change-password";
import ListOrdersActive from "pages/orders/order-active";
import ListOrdersUnpaid from "pages/orders/order-unpaid";
import DetailsClients from "pages/clients/details-clients";
import Dashboard1 from "pages/dashboard";
import Dashboard2 from "pages/dashboard2";
import CreateSimpleClient from "pages/clients/create-simple-client";
import OrderLocalCreate from "pages/orders/order-local-create";
import MoveProductsLots from "pages/productsLots/move-productsLots";
import ListDistribution from "pages/distributionList";
import ProductsSellByDay from "pages/reports/producstsSell";
import ProductsSellByRange from "pages/reports/producstsSell/reportByRange";
import StockMain from "pages/productsLots";
import ResetPoints from "pages/resetPoints";
import LocationsPage from "pages/locations";
import Dashboard3 from "pages/dashboard3";
import Products from "pages/products";
import NewCategory from "pages/products/category-create";
import EditCategory from "pages/products/category-edit";
import ProductDetail from "pages/products/pruduct-detail";
import DetailClientProduct from "pages/clients/details-clients-products";
import DetailsDeliveryTruck from "pages/deliveryTruck/details-deliveryTruck";

const routes = [
  {
    route: "/dashboard/totales",
    component: (
      <RequireAuth>
        <Dashboard1 />
      </RequireAuth>
    ),
  },
  {
    route: "/dashboard/reparto",
    component: (
      <RequireAuth>
        <Dashboard2 />
      </RequireAuth>
    ),
  },
  {
    route: "/dashboard/cajones_de_pollo",
    component: (
      <RequireAuth>
        <Dashboard3 />
      </RequireAuth>
    ),
  },

  /* usuario  */
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
  {
    route: "/usuarios/editar/password/:id",
    component: (
      <RequireAuth>
        <EditPasswordUser />
      </RequireAuth>
    ),
  },
  /* Productos */

  {
    route: "/productos",
    component: (
      <RequireAuth>
        <Products />
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
    route: "/productos/detalle/:id",
    component: (
      <RequireAuth>
        <ProductDetail />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/categoria/nueva",
    component: (
      <RequireAuth>
        <NewCategory />
      </RequireAuth>
    ),
  },
  {
    route: "/productos/categoria/editar/:id",
    component: (
      <RequireAuth>
        <EditCategory />
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
        <StockMain />
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
    route: "/productos/stock/mover/:id",
    component: (
      <RequireAuth>
        <MoveProductsLots />
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
    route: "/clientes/nuevo-simple",
    component: (
      <RequireAuth>
        <CreateSimpleClient />
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
  {
    route: "/clientes/detalle/:id",
    component: (
      <RequireAuth>
        <DetailsClients />
      </RequireAuth>
    ),
  },
  {
    route: "/clientes/detalle/producto/:id",
    component: (
      <RequireAuth>
        <DetailClientProduct />
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
  {
    route: "/clientes/localizacion",
    component: (
      <RequireAuth>
        <LocationsPage />
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
    route: "/ordenes/lista/activas",
    component: (
      <RequireAuth>
        <ListOrdersActive />
      </RequireAuth>
    ),
  },
  {
    route: "/ordenes/lista/impagas",
    component: (
      <RequireAuth>
        <ListOrdersUnpaid />
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
    route: "/ordenes/nueva-local",
    component: (
      <RequireAuth>
        <OrderLocalCreate />
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
        <EditDeliverySubZone />
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
  {
    route: "/distribucion/repartidores/detalle/:id",
    component: (
      <RequireAuth>
        <DetailsDeliveryTruck />
      </RequireAuth>
    ),
  },
  /* Lista distribucion */
  {
    route: "/distribucion/repartidores/lista-reparto",
    component: (
      <RequireAuth>
        <ListDistribution />
      </RequireAuth>
    ),
  },
  /* Reportes */
  {
    route: "/reportes/productos-vendidos-por-dia",
    component: (
      <RequireAuth>
        <ProductsSellByDay />
      </RequireAuth>
    ),
  },
  {
    route: "/reportes/productos-vendidos-por-rango",
    component: (
      <RequireAuth>
        <ProductsSellByRange />
      </RequireAuth>
    ),
  },
  // reset points
  {
    route: "/puntos/reset",
    component: (
      <RequireAuth>
        <ResetPoints />
      </RequireAuth>
    ),
  },
];

export default routes;
