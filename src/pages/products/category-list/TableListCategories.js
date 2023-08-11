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
import MenuListUsers from "./MenuListUsers";

function TableListCategories({ categories }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "_id",
      headerName: "ID",
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
      <Box m="20px">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <MDButton
            color="dark"
            variant="gradient"
            onClick={() => navigate("/productos/categoria/nueva")}
          >
            Nueva categoria
          </MDButton>
        </Stack>
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={categories}
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

      <MenuListUsers open={open} handleCloseMenu={handleCloseMenu} categoryId={productId} />
    </>
  );
}

export default TableListCategories;
