/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Avatar, Box, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDButton from "components/MDButton";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import MenuListUsers from "./MenuListUsers";

function TableListProducts({ products }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const listProducts = products.products;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [productId, setProductId] = useState(null);

  const handleOpenMenu = (id, event) => {
    setOpen(event.currentTarget);
    setProductId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setProductId(null);
  };

  const columns = [
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => <Avatar src={params.row.img} />,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "name",
      headerName: "Nombre",
      flex: 3,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "brand",
      headerName: "Marca",
      flex: 1.4,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "unit",
      headerName: "Unidad",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "category",
      headerName: "Categoria",
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
      field: "available",
      headerName: "Disponible",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.row.available ? (
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

      renderCell: ({ row: { _id } }) => (
        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(_id, e)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <MDButton color="dark" variant="gradient" onClick={() => navigate("/productos/nuevo")}>
            Crear
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={listProducts.map((product) => ({
              _id: product._id,
              img:
                product.img ||
                "https://ik.imagekit.io/mrprwema7/No_image_available.svg_f8oa-E8hq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669124011945",
              name: product.name,
              brand: product.brand,
              unit: product.unit,
              category: product?.category?.name,
              type: product.type,
              available: product.available,
              description: product.description,
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

      <MenuListUsers open={open} handleCloseMenu={handleCloseMenu} productId={productId} />
    </>
  );
}

export default TableListProducts;
