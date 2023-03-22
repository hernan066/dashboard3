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
import UsersActions from "./UsersActions";

function TableListOferts({ oferts }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const listOferts = oferts.data.oferts;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [ofertId, setOfertId] = useState(null);
  const [prodId, setProdId] = useState(null);
  const [rowId, setRowId] = useState(null);

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
      flex: 4,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "description",
      headerName: "Presentación",
      flex: 4,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "basePrice",
      headerName: "P. Base",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          {params.row.basePrice}
        </div>
      ),
    },
    {
      field: "retailPrice",
      headerName: "P. Minorista",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#c76d00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          {params.row.retailPrice}
        </div>
      ),
    },
    {
      field: "price1",
      headerName: "Precio 1",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#a903fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          {params.row.price1}
        </div>
      ),
    },
    {
      field: "quantity1",
      headerName: "Cant. 1 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#b2b1b3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontWeight: 800,
          }}
        >
          {params.row.quantity1}
        </div>
      ),
    },
    {
      field: "price2",
      headerName: "Precio 2",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#9200c7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          {params.row.price2}
        </div>
      ),
    },
    {
      field: "quantity2",
      headerName: "Cant. 2 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#9c9c9c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontWeight: 800,
          }}
        >
          {params.row.quantity2}
        </div>
      ),
    },
    {
      field: "price3",
      headerName: "Precio 3",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#710299",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          {params.row.price3}
        </div>
      ),
    },
    {
      field: "quantity3",
      headerName: "Cant. 3 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#878787",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontWeight: 800,
          }}
        >
          {params.row.quantity3}
        </div>
      ),
    },
    {
      field: "price4",
      headerName: "Precio 4",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#550273",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          {params.row.price4}
        </div>
      ),
    },
    {
      field: "quantity4",
      headerName: "Cant. 4 ",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#6e6e6e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontWeight: 800,
          }}
        >
          {params.row.quantity4}
        </div>
      ),
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
      flex: 0.3,
      renderCell: ({ row: { _id, productId } }) => (
        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(_id, e, productId)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Guardar",
      type: "actions",
      renderCell: (params) => <UsersActions {...{ params, rowId, setRowId }} />,
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
        <Box m="40px 0 0 0" height="75vh" width="2400px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            onCellEditCommit={(params) => setRowId(params.id)}
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
              basePrice: ofert.basePrice || 0,
              retailPrice: ofert.retailPrice || 0,

              price1: ofert.prices[0]?.price1 || 0,
              price2: ofert.prices[0]?.price2 || 0,
              price3: ofert.prices[0]?.price3 || 0,
              price4: ofert.prices[0]?.price4 || 0,
              quantity1: ofert.quantities[0]?.quantity1 || "",
              quantity2: ofert.quantities[0]?.quantity2 || "",
              quantity3: ofert.quantities[0]?.quantity3 || "",
              quantity4: ofert.quantities[0]?.quantity4 || "",
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
