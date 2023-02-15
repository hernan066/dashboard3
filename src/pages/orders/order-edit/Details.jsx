/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Box, Card, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "redux/ordersSlice";
import EditAddressForm from "./EditAddressForm";
import ItemCard from "./ItemCard";

function Details({ order, deliveryZones, deliveryTrucks }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addOrder(order));
  }, []);

  const orderStore = useSelector((store) => store.order.order);

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
        {orderStore?.orderItems.map((product) => (
          <ItemCard product={product} key={product._id} />
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
          <MDTypography variant="h6">${orderStore?.subTotal}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Envío</MDTypography>
          <MDTypography variant="h6">${orderStore?.tax}</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Total</MDTypography>
          <MDTypography variant="h6">${orderStore?.total}</MDTypography>
        </Box>

        <MDTypography variant="h6">Datos del cliente</MDTypography>
        <EditAddressForm zones={deliveryZones} deliveryTrucks={deliveryTrucks} order={order} />
      </Card>
    </Box>
  );
}

export default Details;
