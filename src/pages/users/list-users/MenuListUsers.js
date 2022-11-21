/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

function MenuListUsers({ open, handleCloseMenu, userId }) {
  const navigate = useNavigate();
  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 120,
          zIndex: 20,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => navigate(`/users/details/${userId}`)}>
        <VisibilityIcon sx={{ mr: 1 }} />
        Ver
      </MenuItem>
      <MenuItem onClick={() => navigate(`/users/edit/${userId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }}>
        <DeleteIcon sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Popover>
  );
}

export default MenuListUsers;
