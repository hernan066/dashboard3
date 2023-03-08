/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Alert, Box, Button, Card, Divider, TextField } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import colors from "assets/theme/base/colors";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "redux/cartSlice";
import { formatPrice } from "utils/formaPrice";
import MDButton from "components/MDButton";
import { usePostOrderLocalMutation } from "api/orderApi";
import ItemCart from "./ItemCart";
import Receipt from "../receipt/Receipt";

function Cart() {
  const { products, subTotal, client, receiptId } = useSelector((store) => store.cart);
  const [cash, setCash] = useState(0);
  const [transfer, setTransfer] = useState(0);
  const [debt, setDebt] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, isError }] = usePostOrderLocalMutation();

  const handlerCreate = async () => {
    const productsOrder = products.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      unit: item.product.unit,
      description: item.product.description,
      img: item.product.img,
      quantity: item.finalQuantity,
      price: item.finalPrice,
      totalQuantity: item.finalQuantity,
      totalPrice: item.finalPrice,
      unitPrice: item.basePrice,
    }));

    const newOrder = {
      userId: client.user._id,
      client: client._id,
      orderItems: productsOrder,
      shippingAddress: {
        name: client.user.name,
        lastName: client.user.lastName,
        phone: client.user.phone,
        address: "",
        flor: "",
        department: "",
        city: "",
        province: "",
        zip: null,
      },
      deliveryTruck: null,
      employeeId: null,
      deliveryZone: null,
      numberOfItems: products.length,
      tax: 0,
      subTotal,
      total: subTotal,
      status: "Entregado",
      receiptId,
      deliveryDate: new Date(),
      paid: cash + transfer === subTotal ? true : false,
      payment: {
        cash,
        transfer,
        debt,
      },
    };
    console.log(newOrder);

    const { data } = await createOrder(newOrder).unwrap();
    if (data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden creada con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(clearCart());
      navigate("/ordenes/lista");
    }
  };

  const handlerCash = () => {
    const rest = subTotal - transfer - debt;
    setCash(rest);
  };
  const handlerTransfer = () => {
    const rest = subTotal - cash - debt;
    setTransfer(rest);
  };
  const handlerDebt = () => {
    const rest = subTotal - transfer - cash;
    setDebt(rest);
  };

  if (!client) {
    return <Alert severity="warning">Debes cargar antes los datos del cliente</Alert>;
  }
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
        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Total</MDTypography>
          <MDTypography variant="h6">{formatPrice(subTotal)}</MDTypography>
        </Box>
        <Divider />
        <MDTypography variant="h6">Datos del cliente</MDTypography>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Nombre:</MDTypography>
          <MDTypography variant="h6">{client.user.name}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Apellido:</MDTypography>
          <MDTypography variant="h6">{client.user.lastName}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Teléfono:</MDTypography>
          <MDTypography variant="h6">{client.user.phone}</MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">DNI:</MDTypography>
          <MDTypography variant="h6">{client.cuit}</MDTypography>
        </Box>

        <Divider />

        <MDTypography variant="h6">Pago</MDTypography>
        <Divider />
        <TextField
          type="number"
          label="Efectivo"
          margin="normal"
          InputProps={{ inputProps: { min: "0" } }}
          value={cash}
          onChange={(e) => setCash(e.target.value)}
        />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: "0" } }}
          label="Transferencia"
          margin="normal"
          value={transfer}
          onChange={(e) => setTransfer(e.target.value)}
        />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: "0" } }}
          label="Deuda"
          margin="normal"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <MDButton
            variant="outlined"
            color="success"
            onClick={handlerCash}
            sx={{
              mt: 3,
              flex: 1,
            }}
          >
            Efectivo
          </MDButton>
          <MDButton
            variant="outlined"
            color="success"
            onClick={handlerTransfer}
            sx={{
              mt: 3,
              flex: 1,
            }}
          >
            Transfer.
          </MDButton>
          <MDButton
            variant="outlined"
            color="error"
            onClick={handlerDebt}
            sx={{
              mt: 3,
              flex: 1,
            }}
          >
            Deuda
          </MDButton>
        </Box>
        <Receipt />
        <LoadingButton
          type="submit"
          color="info"
          variant="contained"
          loading={isLoading}
          onClick={handlerCreate}
          sx={{
            mt: 3,
            backgroundColor: `${colors.info.main}`,
            color: "white !important",
            width: "100%",
          }}
        >
          Confirmar orden
        </LoadingButton>
        {isError && <Alert severity="error">Error: orden no creada!</Alert>}
      </Card>
    </Box>
  );
}

export default Cart;
