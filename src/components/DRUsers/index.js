/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Avatar, Box, CircularProgress, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import apiRequest from "api/apiRequest";
import MDButton from "components/MDButton";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";

import PopoverMenu from "./PopoverMenu";

function UserList() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetcher = (url) => apiRequest.get(url);

  const { data: usersData } = useSWR(`/user`, fetcher);
  const users = usersData?.data.data.users;

  const handleOpenMenu = (id, event) => {
    setOpen(event.currentTarget);
    setUserId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setUserId(null);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => <Avatar src={params.row.avatar} />,
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
      field: "phone",
      headerName: "Telefono",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "role",
      headerName: "Rol",
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
      {!usersData ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box m="20px">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <MDButton color="dark" variant="gradient" onClick={() => navigate("/users/new")}>
              Crear
            </MDButton>
          </Stack>
          <Box m="40px 0 0 0" height="75vh">
            <DataGrid
              checkboxSelection
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              rows={users.map((user) => ({
                _id: user._id,
                name: `${user.name}  ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role.role,
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
      )}

      <PopoverMenu open={open} handleCloseMenu={handleCloseMenu} userId={userId} />
    </>
  );
}

export default UserList;
