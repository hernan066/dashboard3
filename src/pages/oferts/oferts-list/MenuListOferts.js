/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDeleteOfertMutation } from "api/ofertApi";
import Swal from "sweetalert2";
import { useEffect } from "react";

function MenuListOferts({ open, handleCloseMenu, ofertId, productId }) {
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
        await deleteProduct(ofertId).unwrap();
      }
    });
  };

  useEffect(() => {
    if (isError)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, oferta no borrada",
        timer: 2500,
      });
  }, [isError]);
  useEffect(() => {
    if (isSuccess)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Oferta borrada con éxito",
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
          width: 180,
          zIndex: 20,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => navigate(`/productos/editar/${productId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Editar Producto
      </MenuItem>
      <MenuItem onClick={() => navigate(`/productos/ofertas/editar/${ofertId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Editar Oferta
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }} onClick={handlerDelete}>
        <DeleteIcon sx={{ mr: 1 }} />
        Borrar Oferta
      </MenuItem>
    </Popover>
  );
}

export default MenuListOferts;
