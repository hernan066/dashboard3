/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { formatPrice } from "utils/formaPrice";
import { useEffect, useState } from "react";
import { dateToLocalDate } from "utils/dateFormat";

function DeliveryCards({ orders, listProducts }) {
  const [updateDate, setUpdateDate] = useState(null);
  console.log(orders);

  const totalBuy = orders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = orders.reduce((acc, curr) => acc + curr.payment.cash, 0);
  const totalTransfer = orders.reduce((acc, curr) => acc + curr.payment.transfer, 0);
  const totalDebt = orders.reduce((acc, curr) => acc + curr.payment.debt, 0);

  const deliveredOrders = orders.filter((order) => order.status === "Entregado");
  const pendingOrders = orders.filter((order) => order.status === "Pendiente");
  const refusedOrders = orders.filter((order) => order.status === "Rechazado");

  const geoLocationOrders = orders.filter((order) => order.shippingAddress.lat).length;

  const totalCost = listProducts.reduce((acc, curr) => acc + curr.unitCost * curr.totalQuantity, 0);
  const totalProfit = listProducts.reduce(
    (acc, curr) => acc + curr.totalPrice - curr.unitCost * curr.totalQuantity,
    0
  );

  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);
  return (
    <MDBox p={3} mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="view_list_icon"
              title="Ordenes totales"
              count={orders.length}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Geo localizables ${geoLocationOrders}`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="pending_actions_icon"
              title="Ordenes pendientes"
              count={pendingOrders.length}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="local_shipping_icon"
              title="Ordenes entregadas"
              count={deliveredOrders.length}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="do_disturb_alt_icon"
              title="Ordenes rechazadas"
              count={refusedOrders.length}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Total vendido"
              count={formatPrice(totalBuy)}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="attach_money_icon"
              color="success"
              title="Total costo"
              count={formatPrice(totalCost)}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="currency_exchange_icon"
              title="Total ganancia"
              count={formatPrice(totalProfit)}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="attach_money_icon"
              color="success"
              title="Pagos en efectivo"
              count={formatPrice(totalCash)}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="currency_exchange_icon"
              title="Transferencias"
              count={formatPrice(totalTransfer)}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="money_off_icon"
              title="Ordenes adeudadas"
              count={formatPrice(totalDebt)}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default DeliveryCards;
