/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDeleteOfertMutation } from "api/ofertApi";
import Swal from "sweetalert2";

function MenuListOrders({ open, handleCloseMenu, orderId }) {
  const navigate = useNavigate();

  const [deleteProduct, { isError, isSuccess }] = useDeleteOfertMutation();

  const handlerDelete = () => {
    handleCloseMenu();
    Swal.fire({
      title: "Deseas borrar este oferta?",
      text: "Este cambio no se puede revertir",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(orderId).unwrap();
        /*  if (isSuccess)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Oferta borrada con éxito",
            showConfirmButton: false,
            timer: 2500,
          });

        if (isError)
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error, oferta no borrada",
            showConfirmButton: false,
            timer: 2500,
          }); */
      }
    });
  };

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
      <MenuItem onClick={() => navigate(`/orders/details/${orderId}`)}>
        <VisibilityIcon sx={{ mr: 1 }} />
        Ver
      </MenuItem>
      <MenuItem onClick={() => navigate(`/orders/edit/${orderId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }} onClick={handlerDelete}>
        <DeleteIcon sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Popover>
  );
}

export default MenuListOrders;
