/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import { Box, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDButton from "components/MDButton";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MenuListClientAddress from "./MenuListClientAddress";

function TableListClientAddress({ clientAddress }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  console.log(clientAddress);

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const handleOpenMenu = (id, event) => {
    console.log(id, event);
    setOpen(event.currentTarget);
    setMenuId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setMenuId(null);
  };

  const columns = [
    {
      field: "user",
      headerName: "Cliente",
      flex: 1.5,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "phone",
      headerName: "Teléfono",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.6,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 1.5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "zone",
      headerName: "Zona",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "province",
      headerName: "Provincia",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "city",
      headerName: "Ciudad",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "zip",
      headerName: "CP",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "clientId",
      headerName: "Cliente Id",
      flex: 2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lat",
      headerName: "Geo",
      flex: 0.8,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.row.lat ? (
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
      field: "accessLevel",
      headerName: "Menu",
      headerClassName: "super-app-theme--header",

      renderCell: ({ row: { clientId } }) => (
        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(clientId, e)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Box m="20px" sx={{ overflowX: "scroll" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <MDButton
            color="dark"
            variant="gradient"
            onClick={() => navigate("/clientes/direcciones/nuevo")}
          >
            Crear
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh" width="2000px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={clientAddress.map((address) => ({
              ...address,
              user: `${address?.user?.name} ${address?.user?.lastName}`,
              email: address?.user?.email,
              phone: address?.user?.phone,
              zone: address?.deliveryZone?.name,
              clientId: address?.client?._id,
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

      <MenuListClientAddress open={open} handleCloseMenu={handleCloseMenu} menuId={menuId} />
    </>
  );
}

export default TableListClientAddress;
