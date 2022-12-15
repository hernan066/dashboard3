/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { Box, Card, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useSelector } from "react-redux";
import ItemCart from "./ItemCart";

function Cart() {
  const { products } = useSelector((store) => store.cart);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
      }}
    >
      <Box
        sx={{
          width: "70%",
        }}
      >
        {products.map((product) => (
          <ItemCart product={product} key={product._id} />
        ))}
      </Box>
      <Card
        sx={{
          width: "30%",
          padding: "30px",
          alignSelf: "flex-start",
        }}
      >
        <MDTypography variant="h6">Resumen</MDTypography>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Subtotal</MDTypography>
          <MDTypography variant="h6">$3000</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Envío</MDTypography>
          <MDTypography variant="h6">$300</MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Total</MDTypography>
          <MDTypography variant="h6">$3300</MDTypography>
        </Box>
      </Card>
    </Box>
  );
}

export default Cart;
