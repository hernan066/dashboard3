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
import MenuDeliverySubZones from "./MenuDeliverySubZone";

function TableListDeliverySubZone({ deliveryZones, subZones }) {
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
      field: "zone",
      headerName: "Zona",
      flex: 0.8,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "SubZona",
      flex: 0.8,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "km2",
      headerName: "Km2",
      flex: 0.6,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "blocks",
      headerName: "Manzanas",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "busStop",
      headerName: "Paradas Colectivos",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalHouses",
      headerName: "Total casas",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "clientHouses",
      headerName: "Casas clientes",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalShops",
      headerName: "Total negocios",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "clientShops",
      headerName: "Negocios clientes",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "north",
      headerName: "L.Norte",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "south",
      headerName: "L.Sur",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "east",
      headerName: "L.Este",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "west",
      headerName: "L.Oeste",
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
            onClick={() => navigate("/distribucion/sub-zonas/nueva")}
          >
            Crear
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh" width="2000px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={subZones.map((zone) => ({
              ...zone,
              zone: zone.deliveryZone?.name,
              east: zone?.limits[0]?.east,
              north: zone?.limits[0]?.north,
              south: zone?.limits[0]?.south,
              west: zone?.limits[0]?.west,
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

      <MenuDeliverySubZones open={open} handleCloseMenu={handleCloseMenu} menuId={menuId} />
    </>
  );
}

export default TableListDeliverySubZone;
