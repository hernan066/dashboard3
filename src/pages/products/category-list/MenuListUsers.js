/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDeleteCategoryMutation } from "api/categoryApi";

function MenuListProducts({ open, handleCloseMenu, categoryId }) {
  const navigate = useNavigate();

  const [deleteCategory, { isError }] = useDeleteCategoryMutation();

  const handlerDelete = () => {
    handleCloseMenu();
    Swal.fire({
      title: "Deseas borrar esta categoria?",
      text: "Si tiene productos asociados a esta categoria, borre estos productos o cambie su categoria primero",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCategory(categoryId).unwrap();
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Categoria borrada con éxito",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
    });
  };
  useEffect(() => {
    if (isError)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, categoria no borrada",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [isError]);

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
      <MenuItem onClick={() => navigate(`/productos/categoria/editar/${categoryId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Editar categoria
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }} onClick={handlerDelete}>
        <DeleteIcon sx={{ mr: 1 }} />
        Borrar categoria
      </MenuItem>
    </Popover>
  );
}

export default MenuListProducts;
