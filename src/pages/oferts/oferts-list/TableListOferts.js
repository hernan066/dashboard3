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

import { dateToLocalDate } from "utils/dateFormat";

import MenuListUsers from "./MenuListOferts";

function TableListOferts({ oferts }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const listOferts = oferts.data.oferts;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [ofertId, setOfertId] = useState(null);
  const [prodId, setProdId] = useState(null);

  const handleOpenMenu = (id, event, productId) => {
    setOpen(event.currentTarget);
    setOfertId(id);
    setProdId(productId);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setOfertId(null);
    setProdId(null);
  };

  const columns = [
    {
      field: "img",
      headerName: "Image",
      width: 70,
      renderCell: (params) => <Avatar src={params.row.img} />,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "product",
      headerName: "Producto",
      flex: 3,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "description",
      headerName: "Descripción",
      flex: 1.5,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "unit",
      headerName: "Unidad",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price1",
      headerName: "Precio 1",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quantity1",
      headerName: "Cant. 1 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price2",
      headerName: "Precio 2",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quantity2",
      headerName: "Cant. 2 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price3",
      headerName: "Precio 3",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quantity3",
      headerName: "Cant. 3 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdAt",
      headerName: "Creado",
      flex: 2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "visible",
      headerName: "Visible",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.row.visible ? (
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
      field: "ofert",
      headerName: "Destacado",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.row.ofert ? (
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

      renderCell: ({ row: { _id, productId } }) => (
        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(_id, e, productId)}>
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
            onClick={() => navigate("/productos/ofertas/nueva")}
          >
            Crear
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh" width="1900px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={listOferts.map((ofert) => ({
              _id: ofert._id,
              img:
                ofert?.product?.img ||
                "https://ik.imagekit.io/mrprwema7/No_image_available.svg_f8oa-E8hq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669124011945",
              product: ofert?.product?.name,
              description: ofert?.description,
              visible: ofert?.visible,
              ofert: ofert?.ofert,
              unit: ofert.product?.unit,
              price1: `$${ofert.prices[0]?.price1}` || "",
              price2: `$${ofert.prices[0]?.price2}` || "",
              price3: `$${ofert.prices[0]?.price3}` || "",
              quantity1: ofert.quantities[0]?.quantity1 || "",
              quantity2: ofert.quantities[0]?.quantity2 || "",
              quantity3: ofert.quantities[0]?.quantity3 || "",
              createdAt: dateToLocalDate(ofert.createdAt),
              productId: ofert.product?._id,
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

      <MenuListUsers
        open={open}
        handleCloseMenu={handleCloseMenu}
        ofertId={ofertId}
        productId={prodId}
      />
    </>
  );
}

export default TableListOferts;
