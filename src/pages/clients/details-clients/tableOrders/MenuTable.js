/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MenuItem, Popover } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDeleteOrderMutation, usePutOrderMutation } from "api/orderApi";

function MenuTable({ open, handleCloseMenu, orderId, orderActive, orderPaid, clientId }) {
  const navigate = useNavigate();

  const [editOrder, { isSuccess: s1, isError: e1 }] = usePutOrderMutation();

  const handlerActivate = async () => {
    const id = orderId;
    handleCloseMenu();
    const editOrderValues = {
      active: !orderActive,
    };
    await editOrder({ id, ...editOrderValues }).unwrap();
  };

  const handlerPaid = async () => {
    const id = orderId;
    handleCloseMenu();
    const editOrderValues = {
      paid: !orderPaid,
    };
    await editOrder({ id, ...editOrderValues }).unwrap();
  };

  /*  useEffect(() => {
    if (isError)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, orden no borrada",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [isError]);
  useEffect(() => {
    if (isSuccess)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order borrada con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [isSuccess]); */
  useEffect(() => {
    if (e1)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [e1]);
  useEffect(() => {
    if (s1)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Modificación exitosa",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [s1]);
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
      <MenuItem onClick={() => navigate(`/ordenes/detalle/${orderId}`)}>
        <VisibilityIcon sx={{ mr: 1 }} />
        Ver Orden
      </MenuItem>
      <MenuItem onClick={() => navigate(`/clientes/detalle/${clientId}`)}>
        <VisibilityIcon sx={{ mr: 1 }} />
        Ver Cliente
      </MenuItem>
      <MenuItem onClick={handlerActivate}>
        <EditIcon sx={{ mr: 1 }} />
        Activar/Desactivar
      </MenuItem>
      <MenuItem onClick={handlerPaid}>
        <EditIcon sx={{ mr: 1 }} />
        Orden pagada
      </MenuItem>
      <MenuItem onClick={() => navigate(`/ordenes/editar/${orderId}`)}>
        <EditIcon sx={{ mr: 1 }} />
        Editar/Borrar Orden
      </MenuItem>
    </Popover>
  );
}

export default MenuTable;
