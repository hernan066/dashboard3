/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function MenuProductsLots({ open, handleCloseMenu, productsLotsId }) {
  console.log(productsLotsId);
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
          width: 150,
          zIndex: 20,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem
        onClick={() =>
          navigate(`/productos/stock/editar/${productsLotsId.productId}?lotId=${productsLotsId.id}`)
        }
      >
        <EditIcon sx={{ mr: 1 }} />
        Editar Stock
      </MenuItem>
      <MenuItem
        onClick={() =>
          navigate(`/productos/stock/mover/${productsLotsId.productId}?lotId=${productsLotsId.id}`)
        }
      >
        <EditIcon sx={{ mr: 1 }} />
        Mover Stock
      </MenuItem>
    </Popover>
  );
}

export default MenuProductsLots;
