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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MenuProductsLots from "./MenuDeliveryTruck";

function TableListClients({ clients }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const handleOpenMenu = (id, event) => {
    setOpen(event.currentTarget);
    setMenuId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setMenuId(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "cuit",
      headerName: "CUIT",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "Telefono",
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
      field: "category",
      headerName: "Categoría",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "contactMeans",
      headerName: "Ingresa por",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "campaignName",
      headerName: "En campaña",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "accessLevel",
      headerName: "Menu",
      headerClassName: "super-app-theme--header",

      renderCell: ({ row: { _id } }) => (
        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(_id, e)}>
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
            onClick={() => navigate("/delivery_trucks/new")}
          >
            Crear
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh" width="1500px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={clients.map((client) => ({
              ...client,
              name: `${client.user.name} ${client.user.lastName}`,
              email: client.user.email,
              phone: client.user.phone,
              type: client.clientType.clientType,
              category: client.clientCategory.clientCategory,
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

      <MenuProductsLots open={open} handleCloseMenu={handleCloseMenu} menuId={menuId} />
    </>
  );
}

export default TableListClients;
