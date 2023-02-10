/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Box, Card, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";
import EditAddressForm from "./EditAddressForm";

function Details({ order, deliveryZones, deliveryTrucks }) {
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
        {order.orderItems.map((product) => (
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
          <MDTypography variant="h6">${order.subTotal}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Envío</MDTypography>
          <MDTypography variant="h6">${order.tax}</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Total</MDTypography>
          <MDTypography variant="h6">${order.total}</MDTypography>
        </Box>

        <MDTypography variant="h6">Datos del cliente</MDTypography>
        <EditAddressForm zones={deliveryZones} deliveryTrucks={deliveryTrucks} order={order} />
      </Card>
    </Box>
  );
}

export default Details;
