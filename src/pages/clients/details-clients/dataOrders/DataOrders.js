/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

import { Box, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

export function DataOrders({ listOrders, clientBuy }) {
  const totalOrders = listOrders.length;
  const pendingOrders = listOrders.filter((order) => order.status === "Pendiente").length;
  const paidOrders = listOrders.filter((order) => order.paid).length;
  const unpaidOrders = listOrders.filter((order) => !order.paid).length;

  const totalBuy = listOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = listOrders.reduce((acc, curr) => acc + curr.payment.cash, 0);
  const totalTransfer = listOrders.reduce((acc, curr) => acc + curr.payment.transfer, 0);
  const totalDebt = listOrders.reduce((acc, curr) => acc + curr.payment.debt, 0);

  return (
    <Box
      mb={5}
      sx={{
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: 1,
        padding: 2,
        alignSelf: "flex-start",
      }}
    >
      <MDTypography variant="h5">Resumen de ordenes</MDTypography>
      <Divider />
      <MDBox mb={1} sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Total de ordenes:</MDTypography>
        <MDBox
          sx={{
            backgroundColor: "blue",
            padding: "3px 10px",
            borderRadius: "50%",
          }}
        >
          <MDTypography variant="h6" sx={{ color: "#fff" }}>
            {totalOrders}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mb={1} sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ordenes pendientes:</MDTypography>
        <MDBox
          sx={{
            backgroundColor: "red",
            padding: "3px 10px",
            borderRadius: "50%",
          }}
        >
          <MDTypography variant="h6" sx={{ color: "#fff" }}>
            {pendingOrders}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mb={1} sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ordenes pagas:</MDTypography>
        <MDBox
          sx={{
            backgroundColor: "green",
            padding: "3px 10px",
            borderRadius: "50%",
          }}
        >
          <MDTypography variant="h6" sx={{ color: "#fff" }}>
            {paidOrders}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mb={1} sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ordenes impagas:</MDTypography>
        <MDBox
          sx={{
            backgroundColor: "#a10d2a",
            padding: "3px 10px",
            borderRadius: "50%",
          }}
        >
          <MDTypography variant="h6" sx={{ color: "#fff" }}>
            {unpaidOrders}
          </MDTypography>
        </MDBox>
      </MDBox>

      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Monto total de compras: </MDTypography>
        <MDTypography variant="h6">{totalBuy ? formatPrice(totalBuy) : "$0"}</MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Total de pagos en efectivo: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "green" }}>
          {totalCash ? formatPrice(totalCash) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Total de pagos en transferencias: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "green" }}>
          {totalTransfer ? formatPrice(totalTransfer) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Total de deudas: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "red" }}>
          {totalDebt ? formatPrice(totalDebt) : "$0"}
        </MDTypography>
      </MDBox>

      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between", marginTop: "12px" }}>
        <MDTypography variant="h6">Promedio de compra: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "black" }}>
          {clientBuy?.totalBuy ? formatPrice(totalBuy / totalOrders) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between", marginTop: "12px" }}>
        <MDTypography variant="h6">Compras (desde el 21/03): </MDTypography>
        <MDTypography variant="h6" sx={{ color: "black" }}>
          {clientBuy?.totalBuy ? formatPrice(clientBuy?.totalBuy) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Costo (desde el 21/03): </MDTypography>
        <MDTypography variant="h6" sx={{ color: "red" }}>
          {clientBuy?.totalBuy ? formatPrice(clientBuy?.totalCost) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ganancia (desde el 21/03): </MDTypography>
        <MDTypography variant="h6" sx={{ color: "green" }}>
          {clientBuy?.totalBuy ? formatPrice(clientBuy?.totalProfits) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ganancia % (desde el 21/03): </MDTypography>
        <MDTypography variant="h6" sx={{ color: "black" }}>
          {clientBuy?.totalProfits
            ? formatQuantity((clientBuy.totalProfits * 100) / clientBuy.totalCost)
            : "0"}
          %
        </MDTypography>
      </MDBox>
    </Box>
  );
}
