/* eslint-disable no-underscore-dangle */
import { Avatar, Box, Button, CircularProgress, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import apiRequest from "api/apiRequest";
import PopoverMenu from "./PopoverMenu";

function UserList() {
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
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Telefono",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Menu",

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
            <Button variant="contained" onClick={() => navigate("/users/new")}>
              Crear
            </Button>
          </Stack>
          <Box
            m="40px 0 0 0"
            height="75vh"
            /*  sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.purpleAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.grey[800],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.grey[800],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.purpleAccent[200]} !important`,
              },
            }} */
          >
            <DataGrid
              checkboxSelection
              disableSelectionOnClick
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
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}

      <PopoverMenu open={open} handleCloseMenu={handleCloseMenu} userId={userId} />
    </>
  );
}

export default UserList;
