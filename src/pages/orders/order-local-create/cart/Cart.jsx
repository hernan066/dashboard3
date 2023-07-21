/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Alert, Box, Card, Divider, TextField } from "@mui/material";
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
import { usePutProductStockMutation } from "api/productApi";
import { formatQuantity } from "utils/quantityFormat";
import ItemCart from "./ItemCart";
import Receipt from "../receipt/Receipt";

function Cart() {
  const { products, subTotal, client, receiptId, validStockQuantity } = useSelector(
    (store) => store.cart
  );
  const [cash, setCash] = useState(0);
  const [transfer, setTransfer] = useState(0);
  const [debt, setDebt] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading: l1, isError: e1 }] = usePostOrderLocalMutation();
  const [editProductStock, { isLoading: l2, isError: e2 }] = usePutProductStockMutation();

  const handlerCreate = async () => {
    /* return console.table({
      efectivo: cash,
      transferencia: transfer,
      subTotal,
      pagado: cash + transfer,
    }); */
    const productsToEdit = products.map((product) => ({
      productId: product.stock.productId,
      stockId: product.stock._id,
      totalQuantity: product.finalQuantity,
    }));

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
      unitCost: item.stock.unityCost,
      stockId: item.stock._id,
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
      paid: +cash + +transfer === subTotal,
      payment: {
        cash: +cash,
        transfer: +transfer,
        debt: +debt,
      },
    };
    if (validStockQuantity === false) {
      return;
    }

    await createOrder(newOrder).unwrap();

    productsToEdit.map(async (product) => {
      const updateData = {
        /*  stockId: product.stockId, */
        totalQuantity: formatQuantity(product.totalQuantity),
      };
      const id = product.productId;
      const res = await editProductStock({ id, ...updateData }).unwrap();
      console.log(res);
    });

    if (!e1 || !e2) {
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
          InputProps={{ inputProps: { min: 0 } }}
          value={cash}
          onChange={(e) => {
            setTransfer(e.target.value);
          }}
        />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          label="Transferencia"
          margin="normal"
          value={transfer}
          onChange={(e) => setTransfer(e.target.value)}
        />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
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
          loading={l1 || l2}
          onClick={handlerCreate}
          disabled={!validStockQuantity}
          sx={{
            mt: 3,
            backgroundColor: `${colors.info.main}`,
            color: "white !important",
            width: "100%",
          }}
        >
          Confirmar orden
        </LoadingButton>
        {(e1 || e2) && <Alert severity="error">Error: orden no creada!</Alert>}
        {!validStockQuantity && (
          <Alert severity="error">No hay suficiente stock para crear la orden</Alert>
        )}
      </Card>
    </Box>
  );
}

export default Cart;
