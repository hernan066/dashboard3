/* eslint-disable import/prefer-default-export */
export const menuList = [
  {
    name: "Dashboard",
    icon: "loyalty",
    key: "dashboard",
    subRoutes: [
      {
        name: "Totales",
        icon: "signal_cellular_alt_icon",
        url: "/dashboard/totales",
      },
      {
        name: "Hoy",
        icon: "signal_cellular_alt_icon",
        url: "/dashboard/hoy",
      },
    ],
  },
  {
    name: "Usuarios",
    icon: "person",
    key: "usuarios",
    subRoutes: [
      {
        name: "Lista usuarios",
        icon: "format_list_bulleted_icon",
        url: "/usuarios/lista",
      },
    ],
  },
  {
    name: "Productos",
    icon: "shoppingCartIcon",
    key: "productos",
    subRoutes: [
      {
        name: "Lista productos",
        icon: "format_list_bulleted_icon",
        url: "/productos/lista",
      },
      {
        name: "Proveedores",
        icon: "factory",
        url: "/productos/proveedores/lista",
      },
      {
        name: "Stock",
        icon: "list_alt",
        url: "/productos/stock/lista",
      },
      {
        name: "Ofertas (web)",
        icon: "loyalty",
        url: "/productos/ofertas/lista",
      },
    ],
  },
  {
    name: "Clientes",
    icon: "perm_contact_calendar_icon",
    key: "clientes",
    subRoutes: [
      {
        name: "Lista clientes",
        icon: "format_list_bulleted_icon",
        url: "/clientes/lista",
      },
      {
        name: "Direcciones",
        icon: "holiday_village_icon",
        url: "/clientes/direcciones/lista",
      },
    ],
  },
  {
    name: "Ordenes",
    icon: "view_list_icon",
    key: "ordenes",
    subRoutes: [
      {
        name: "Lista ordenes",
        icon: "format_list_bulleted_icon",
        url: "/ordenes/lista",
      },
      {
        name: "Ordenes activas",
        icon: "format_list_bulleted_icon",
        url: "/ordenes/lista/activas",
      },
      {
        name: "Ordenes impagas",
        icon: "format_list_bulleted_icon",
        url: "/ordenes/lista/impagas",
      },
    ],
  },
  {
    name: "Distribución",
    icon: "local_shipping_icon",
    key: "distribucion",
    subRoutes: [
      {
        name: "Lista reparto",
        icon: "format_list_bulleted_icon",
        url: "/distribucion/repartidores/lista-reparto",
      },
      {
        name: "Distribuidoras",
        icon: "store_icon",
        url: "/distribucion/distribuidoras/lista",
      },
      {
        name: "Repartidores",
        icon: "local_shipping_icon",
        url: "/distribucion/repartidores/lista",
      },
      {
        name: "Zonas reparto",
        icon: "home_work_icon",
        url: "/distribucion/zonas/lista",
      },
      {
        name: "SubZonas reparto",
        icon: "home_work_icon",
        url: "/distribucion/sub-zonas/lista",
      },
    ],
  },
  {
    name: "Reportes",
    icon: "assessment_icon",
    key: "reportes",
    subRoutes: [
      {
        name: "Productos vendidos",
        icon: "format_list_bulleted_icon",
        url: "/reportes/productos-vendidos-por-dia",
      },
    ],
  },
];
