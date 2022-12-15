/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, Divider, MenuItem, TextField } from "@mui/material";
import { usePutOrderMutation } from "api/orderApi";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";

function Details({ order }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orderItems, shippingAddress } = order.data.order;
  const { order: orderDetail } = order.data;
  const [status, setStatus] = useState("");

  const [editOrder, { isLoading, isError }] = usePutOrderMutation();

  const handlerEdit = async () => {
    const { data } = await editOrder({ id, ...orderDetail, status }).unwrap();
    if (data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden editada con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/orders");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        width: "100%",
      }}
    >
      <Card
        sx={{
          padding: "25px",
          width: "66%",
          alignSelf: "flex-start",
        }}
      >
        <MDTypography variant="h6">Productos</MDTypography>
        {orderItems.map((product) => (
          <>
            <Divider />
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Box
                sx={{
                  width: 100,
                }}
              >
                <img
                  src="https://ik.imagekit.io/mrprwema7/product_lHRQybEfFM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669154831378"
                  alt=""
                  style={{
                    width: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <MDTypography variant="subtitle2">{product.description}</MDTypography>
                <MDTypography variant="subtitle2"> Cant. {product.quantity}</MDTypography>
                <MDTypography variant="subtitle2"> Unit. {product.unit}</MDTypography>
                <MDTypography variant="subtitle2"> ${product.price}</MDTypography>
              </Box>
            </Box>
          </>
        ))}
      </Card>
      <Card
        sx={{
          padding: "25px",
          width: "33%",
        }}
      >
        <MDTypography variant="h6">Resumen</MDTypography>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Subtotal</MDTypography>
          <MDTypography variant="h6">${orderDetail.subTotal}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Envío</MDTypography>
          <MDTypography variant="h6">${orderDetail.tax}</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Total</MDTypography>
          <MDTypography variant="h6">${orderDetail.total}</MDTypography>
        </Box>

        <MDTypography variant="h6">Datos del cliente</MDTypography>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Nombre</MDTypography>
          <MDTypography variant="h6">{`${shippingAddress.name} ${shippingAddress.lastName}`}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Dirección</MDTypography>
          <MDTypography variant="h6">{shippingAddress.address}</MDTypography>
        </Box>
        {shippingAddress.flor && (
          <Box display="flex" justifyContent="space-between">
            <MDTypography variant="body2">Piso</MDTypography>
            <MDTypography variant="h6">{shippingAddress.flor}</MDTypography>
          </Box>
        )}
        {shippingAddress.department && (
          <Box display="flex" justifyContent="space-between">
            <MDTypography variant="body2">Departamento</MDTypography>
            <MDTypography variant="h6">{shippingAddress.department}</MDTypography>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Telefono</MDTypography>
          <MDTypography variant="h6">{shippingAddress.phone}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Provincia</MDTypography>
          <MDTypography variant="h6">{shippingAddress.province}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Ciudad</MDTypography>
          <MDTypography variant="h6">{shippingAddress.city}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Zona</MDTypography>
          <MDTypography variant="h6">Cargar despues</MDTypography>
        </Box>
        <Divider />

        <MDTypography variant="h6">Estado de orden</MDTypography>
        <TextField
          margin="normal"
          select
          name="status"
          label="Estado"
          fullWidth
          onChange={(e) => setStatus(e.target.value)}
          /* value={formik.values.category}
            error={!!formik.errors.category}
            helperText={formik.errors.category}
            onChange={formik.handleChange} */
        >
          <MenuItem value="Pendiente" selected={orderDetail.status === "Pendiente"}>
            Pendiente
          </MenuItem>
          <MenuItem value="Entregada" selected={orderDetail.status === "Entregada"}>
            Entregada
          </MenuItem>
          <MenuItem value="Rechazada" selected={orderDetail.status === "Rechazada"}>
            Rechazada
          </MenuItem>
        </TextField>

        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Repartidor</MDTypography>
          <MDTypography variant="h6">Cargar despues</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Cargado por</MDTypography>
          <MDTypography variant="h6">Cargar despues</MDTypography>
        </Box>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={handlerEdit}
          sx={{
            mt: 3,
            backgroundColor: `${colors.info.main}`,
            color: "white !important",
            width: "100%",
          }}
        >
          Editar orden
        </LoadingButton>
        {isError && <Alert severity="error">Error: orden no creada!</Alert>}
      </Card>
    </Box>
  );
}

export default Details;
