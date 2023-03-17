/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Box, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDButton from "components/MDButton";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";
import { dateToLocalDate } from "utils/dateFormat";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { formatPrice } from "utils/formaPrice";
import MenuTable from "./MenuTable";

function TableList({ orders: listOrders }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderActive, setOrderActive] = useState(null);
  const [orderPaid, setOrderPaid] = useState(null);
  const [clientId, setClientId] = useState(null);

  const handleOpenMenu = (id, event, active, paid, cliId) => {
    setOpen(event.currentTarget);
    setOrderId(id);
    setOrderActive(active);
    setOrderPaid(paid);
    setClientId(cliId);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setOrderId(null);
    setOrderActive(null);
    setOrderPaid(null);
    setClientId(null);
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Creada",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (params.row.status === "Entregado") {
          return (
            <div
              style={{
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                backgroundColor: "green",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 0 2px #555",
              }}
            >
              Entregada
            </div>
          );
        }
        if (params.row.status === "Rechazado") {
          return (
            <div
              style={{
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                backgroundColor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              Rechazada
            </div>
          );
        }
        return (
          <div
            style={{
              height: "30px",
              width: "100px",
              borderRadius: "10px",
              backgroundColor: "yellow",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              boxShadow: "0 0 2px #555",
            }}
          >
            {params.row.status}
          </div>
        );
      },
    },

    {
      field: "deliveryDate",
      headerName: "Entregada",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "paid",
      headerName: "Pagada",
      flex: 0.8,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.row.paid ? (
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <CheckIcon />
          </div>
        ) : (
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <CloseIcon />
          </div>
        ),
    },

    {
      field: "client",
      headerName: "Cliente",
      flex: 1.5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "zone",
      headerName: "Zona",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "deliveryTruck",
      headerName: "Repartidor",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "active",
      headerName: "Activa",
      flex: 0.6,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.row.active ? (
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <CheckIcon />
          </div>
        ) : (
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <CloseIcon />
          </div>
        ),
    },
    {
      field: "numberOfItems",
      headerName: "Cant. Productos",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "subTotal",
      headerName: "SubTotal",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ color: "#c97820", fontWeight: "bold" }}>
          {formatPrice(params.row.subTotal)}
        </div>
      ),
    },
    {
      field: "tax",
      headerName: "Envío",
      // flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ fontWeight: "bold", color: "#12adc4" }}>{formatPrice(params.row.tax)}</div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      // flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ fontWeight: "bold", color: "#503bb8" }}>{formatPrice(params.row.total)}</div>
      ),
    },
    {
      field: "cash",
      headerName: "P. Efectivo",
      // flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ fontWeight: "bold", color: "green" }}>{formatPrice(params.row.cash)}</div>
      ),
    },
    {
      field: "transfer",
      headerName: "P. Transferencia",
      // flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ fontWeight: "bold", color: "green" }}>{formatPrice(params.row.transfer)}</div>
      ),
    },
    {
      field: "debt",
      headerName: "Debe",
      // flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ fontWeight: "bold", color: "red" }}>{formatPrice(params.row.debt)}</div>
      ),
    },

    {
      field: "accessLevel",
      headerName: "Menu",
      headerClassName: "super-app-theme--header",

      renderCell: ({ row: { _id, active, paid, clientIdrow } }) => (
        <IconButton
          size="large"
          color="inherit"
          onClick={(e) => handleOpenMenu(_id, e, active, paid, clientIdrow)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Box m="20px" sx={{ overflowX: "scroll" }}>
        <Stack direction="row" alignItems="center" mb={5}>
          <MDButton
            sx={{ marginRight: "10px" }}
            color="dark"
            variant="gradient"
            onClick={() => navigate("/ordenes/nueva")}
          >
            Orden de reparto
          </MDButton>
          <MDButton
            color="info"
            variant="gradient"
            onClick={() => navigate("/ordenes/nueva-local")}
          >
            Orden entrega local
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh" width="2300px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={listOrders.map((order) => ({
              ...order,
              createdAt: dateToLocalDate(order.createdAt),
              deliveryDate: order.deliveryDate
                ? dateToLocalDate(order.deliveryDate)
                : "No entregada",
              client: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`,
              address: order.shippingAddress.address,
              zone: order?.deliveryZone?.name,
              deliveryTruck: order?.deliveryTruck?.truckId,
              cash: order?.payment?.cash || 0,
              transfer: order?.payment?.transfer || 0,
              debt: order?.payment?.debt || 0,
              paid: order.paid,
              clientIdrow: order?.client,
            }))}
            columns={columns}
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-cellContent": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "rgba(0, 100, 255, 0.1)",
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "rgba(0, 100, 255, 0.2)",
              },
              "& .super-app-theme--header": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiTablePagination-root": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiButtonBase-root": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiDataGrid-selectedRowCount": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
            }}
            componentsProps={{
              basePopper: {
                sx: {
                  "& .MuiPaper-root": {
                    backgroundColor: `${darkMode && colors.background.default}`,
                  },
                },
              },
            }}
          />
        </Box>
      </Box>

      <MenuTable
        open={open}
        handleCloseMenu={handleCloseMenu}
        orderId={orderId}
        orderActive={orderActive}
        orderPaid={orderPaid}
        clientId={clientId}
      />
    </>
  );
}

export default TableList;
