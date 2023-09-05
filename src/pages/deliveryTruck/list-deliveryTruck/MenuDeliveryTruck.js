/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDeleteDeliveryTruckMutation } from "api/deliveryTruckApi";

function MenuDeliveryTruck({ open, handleCloseMenu, menuId }) {
  const navigate = useNavigate();

  const [deleteDeliveryTruck, { isError, isSuccess }] = useDeleteDeliveryTruckMutation();

  const handlerDelete = () => {
    handleCloseMenu();
    Swal.fire({
      title: "Deseas borrar este repartidor?",
      text: "Este cambio no se puede revertir",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDeliveryTruck(menuId).unwrap();
      }
    });
  };

  useEffect(() => {
    if (isError)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, repartidor no borrado",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [isError]);
  useEffect(() => {
    if (isSuccess)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Repartidor borrado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [isSuccess]);

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
          width: 190,
          zIndex: 20,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => navigate(`/distribucion/repartidores/detalle/${menuId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Ver Repartidor
      </MenuItem>

      <MenuItem onClick={() => navigate(`/distribucion/repartidores/editar/${menuId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Editar Repartidor
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }} onClick={handlerDelete}>
        <DeleteIcon sx={{ mr: 1 }} />
        Borrar repartidor
      </MenuItem>
    </Popover>
  );
}

export default MenuDeliveryTruck;
