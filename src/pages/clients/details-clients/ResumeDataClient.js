/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { formatPrice } from "utils/formaPrice";

function ResumeDataClient({ client, listOrders, listTopProducts }) {
  const totalOrders = listOrders.length;
  const pendingOrders = listOrders.filter((order) => order.status === "Pendiente").length;
  const paidOrders = listOrders.filter((order) => order.paid).length;
  const unpaidOrders = listOrders.filter((order) => !order.paid).length;
  console.log(listOrders);
  const totalBuy = listOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = listOrders.reduce((acc, curr) => acc + curr.payment.cash, 0);
  const totalTransfer = listOrders.reduce((acc, curr) => acc + curr.payment.transfer, 0);
  const totalDebt = listOrders.reduce((acc, curr) => acc + curr.payment.debt, 0);

  return (
    <>
      <MDBox sx={{ display: "flex", gap: 5 }}>
        <MDBox
          mb={5}
          sx={{
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: 1,
            padding: 2,
            alignSelf: "flex-start",
          }}
        >
          <MDTypography variant="h5">Datos del cliente </MDTypography>
          <Divider />
          <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <MDTypography variant="h6">Nombre: </MDTypography>
            <MDTypography variant="body2">
              {client.user.name} {client.user.lastName}
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <MDTypography variant="h6">Email: </MDTypography>
            <MDTypography variant="body2">{client.user.email}</MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <MDTypography variant="h6">Teléfono: </MDTypography>
            <MDTypography variant="body2">{client.user.phone}</MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <MDTypography variant="h6">Tipo de cliente: </MDTypography>
            <MDTypography variant="body2">{client.clientType.clientType}</MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <MDTypography variant="h6">Categoría de cliente: </MDTypography>
            <MDTypography variant="body2">{client.clientCategory.clientCategory}</MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mb={5} sx={{ flex: 1, border: "1px solid #ccc", borderRadius: 1, padding: 2 }}>
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
        </MDBox>
      </MDBox>

      <MDBox mb={5} sx={{ flex: 1, border: "1px solid #ccc", borderRadius: 1, padding: 2 }}>
        <MDTypography variant="h5">Top productos comprados</MDTypography>
        <Divider />
        <MDBox
          mb={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "35%" }}>
            <MDTypography variant="h6" ml={2} sx={{ letterSpacing: "2px" }}>
              PRODUCTO
            </MDTypography>
          </MDBox>

          <MDTypography
            variant="h6"
            sx={{
              width: "33%",
              textAlign: "center",

              letterSpacing: "2px",
            }}
          >
            DESCRIPCION
          </MDTypography>
          <MDTypography
            variant="h6"
            sx={{
              width: "15%",
              textAlign: "center",

              letterSpacing: "2px",
            }}
          >
            CANTIDAD
          </MDTypography>
          <MDTypography
            variant="h6"
            sx={{
              width: "15%",
              textAlign: "right",

              letterSpacing: "2px",
            }}
          >
            TOTAL
          </MDTypography>
        </MDBox>

        {listTopProducts.map((product) => (
          <MDBox
            mb={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "35%" }}>
              <Avatar src={product.img} />
              <MDTypography variant="body2">{product.name}</MDTypography>
            </MDBox>

            <MDTypography variant="body2" sx={{ width: "35%", textAlign: "center" }}>
              {product.description}
            </MDTypography>
            <MDTypography variant="h6" sx={{ width: "15%", textAlign: "center" }}>
              {product.totalQuantity}
            </MDTypography>
            <MDTypography variant="h6" mr={1} sx={{ width: "15%", textAlign: "right" }}>
              {formatPrice(product.totalPrice)}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </>
  );
}

export default ResumeDataClient;
