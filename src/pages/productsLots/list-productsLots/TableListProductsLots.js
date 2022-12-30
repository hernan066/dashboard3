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
import MenuProductsLots from "./MenuProductsLots";

function TableListProductsLots({ productsLots }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [productsLotsId, setProductsLotsId] = useState(null);

  const handleOpenMenu = (id, event) => {
    setOpen(event.currentTarget);
    setProductsLotsId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setProductsLotsId(null);
  };

  const columns = [
    {
      field: "product",
      headerName: "Producto",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "supplier",
      headerName: "Proveedor",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "cost",
      headerName: "Costo",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "cost_unit",
      headerName: "Costo Unidad",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quantity",
      headerName: "Cant. Comprada",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "stock",
      headerName: "Cant. Actual",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "unit",
      headerName: "Unidad",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdAt",
      headerName: "Fecha Compra",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "updatedAt",
      headerName: "Fecha Actualización",
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
            onClick={() => navigate("/productos/stock/nuevo")}
          >
            Crear
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh" width="1500px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={productsLots.map((productsLot) => ({
              ...productsLot,
              cost: `$${productsLot.cost}`,
              supplier: productsLot.supplier.businessName,
              product: productsLot.product.name,
              unit: productsLot.product.unit,
              cost_unit: `$${productsLot.cost / productsLot.quantity}`,
              createdAt: dateToLocalDate(productsLot.createdAt),
              updatedAt: dateToLocalDate(productsLot.updatedAt),
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

      <MenuProductsLots
        open={open}
        handleCloseMenu={handleCloseMenu}
        productsLotsId={productsLotsId}
      />
    </>
  );
}

export default TableListProductsLots;
