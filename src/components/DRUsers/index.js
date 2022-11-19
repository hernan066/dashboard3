/* eslint-disable no-underscore-dangle */
import {
  alpha,
  Avatar,
  Box,
  CircularProgress,
  gridClasses,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import apiRequest from "api/apiRequest";
import MDButton from "components/MDButton";
import colors from "assets/theme-dark/base/colors";
import styled from "@emotion/styled";
import PopoverMenu from "./PopoverMenu";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  color: theme.palette.mode === "darkMode" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,.85)",
}));

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
            <MDButton color="dark" variant="gradient" onClick={() => navigate("/users/new")}>
              Crear
            </MDButton>
          </Stack>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              /*  "& .MuiDataGrid-root": {
                border: "none",
              }, */
              /* "& .MuiDataGrid-cell": {
                borderBottom: "none",
              }, */
              "& .name-column--cell": {
                color: colors.info.main,
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: colors.grey[800],
              },
              /*  "&:hover, &.Mui-hovered": {
                backgroundColor: colors.info.main,
              },
              "@media (hover: none)": {
                backgroundColor: "transparent",
              }, */
              "& .MuiDataGrid-cellContent": {
                color: colors.grey[600],
                fontWeight: 800,
              },
              /* "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.grey[400],
              }, */
              "& .MuiCheckbox-root": {
                color: `${colors.info.main} !important`,
              },
            }}
          >
            <StripedDataGrid
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
