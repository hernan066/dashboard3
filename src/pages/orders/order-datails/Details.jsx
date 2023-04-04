/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Card, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";

function Details({ order }) {
  const { orderItems, shippingAddress, deliveryZone, deliveryTruck } = order.data.order;
  const { order: orderDetail } = order.data;

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
                  src={product.img}
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
                <MDTypography variant="subtitle2">{product.name}</MDTypography>
                <MDTypography variant="subtitle2"> Cant. {product.totalQuantity}</MDTypography>
                <MDTypography variant="subtitle2"> Unit. {product.unit}</MDTypography>
                <MDTypography variant="subtitle2"> ${product.totalPrice}</MDTypography>
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
        <MDTypography variant="h6">Pago</MDTypography>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Efectivo</MDTypography>
          <MDTypography variant="h6">${orderDetail?.payment?.cash || 0}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Transferencia</MDTypography>
          <MDTypography variant="h6">${orderDetail?.payment?.transfer || 0}</MDTypography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Debe</MDTypography>
          <MDTypography variant="h6">${orderDetail?.payment?.debt || 0}</MDTypography>
        </Box>
        {orderDetail.commentary && (
          <>
            <MDTypography variant="h6">Comentarios</MDTypography>
            <MDTypography variant="body2">{orderDetail.commentary}</MDTypography>
            <Divider />
          </>
        )}

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
          <MDTypography variant="h6">{deliveryZone?.name}</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Estado de orden</MDTypography>
          <MDTypography variant="h6">{orderDetail.status}</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Repartidor</MDTypography>
          <MDTypography variant="h6">{deliveryTruck?.truckId}</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Cargado por</MDTypography>
          <MDTypography variant="h6">Cargar despues</MDTypography>
        </Box>
      </Card>
    </Box>
  );
}

export default Details;
