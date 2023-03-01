/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import React from "react";
import { formatPrice } from "utils/formaPrice";
import OrdersOverview from "./OrdersOverview";
import CardTodayProducts from "./CardTodayProducts";

const getListProducts = (orders) => {
  const listOfProducts = orders.map((product) => product.orderItems);

  const list = [];
  for (let i = 0; i < listOfProducts.length; i++) {
    const element = listOfProducts[i];
    for (let x = 0; x < element.length; x++) {
      list.push(element[x]);
    }
  }

  return list;
};

const repeatSum = (arr) => {
  const arrProductsNonDupli = [];
  const arrProductsIdCounted = [];
  arr.forEach((product, indxA, arrProducts) => {
    // validar si el product ya fue contado en la busqueda de duplicados
    const isCountryCounted = arrProductsIdCounted.includes(product.productId);
    // Si no ha sido contado
    if (!isCountryCounted) {
      arrProductsIdCounted.push(product.productId);

      // Buscar cuantas coincidencias existen del product en el array
      const countriesToCount = arrProducts.filter((ele) => ele.productId === product.productId);

      const country =
        countriesToCount.length > 1
          ? {
              ...product,
              totalQuantity: countriesToCount.reduce((acc, cur) => acc + cur.totalQuantity, 0),
              totalPrice: countriesToCount.reduce((acc, cur) => acc + cur.totalPrice, 0),
            }
          : product;

      arrProductsNonDupli.push(country);
    }
  });

  console.log(arrProductsNonDupli);
  return arrProductsNonDupli;
};

function DashboardToday({ orders, clients, activeOrders }) {
  const { sales, tasks } = reportsLineChartData;
  console.log(activeOrders);
  console.log(orders);

  const totalBuy = activeOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = activeOrders.reduce((acc, curr) => acc + curr.payment.cash, 0);
  const totalTransfer = activeOrders.reduce((acc, curr) => acc + curr.payment.transfer, 0);
  const totalDebt = activeOrders.reduce((acc, curr) => acc + curr.payment.debt, 0);

  const deliveredOrders = activeOrders.filter((order) => order.status === "Entregado");
  const pendingOrders = activeOrders.filter((order) => order.status === "Pendiente");
  const refusedOrders = activeOrders.filter((order) => order.status === "Rechazado");

  const totalOrders = orders.length;

  const listProducts = repeatSum(getListProducts(activeOrders));
  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="view_list_icon"
              title="Ordenes activas"
              count={activeOrders.length}
              percentage={{
                color: "success",
                amount: "+55%",
                label: "than lask week",
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
                color: "success",
                amount: "+3%",
                label: "than last month",
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
                color: "success",
                amount: "+1%",
                label: "than yesterday",
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
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Ventas"
              count={formatPrice(totalBuy)}
              percentage={{
                color: "success",
                amount: "+55%",
                label: "than lask week",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="attach_money_icon"
              color="success"
              title="Pagos en efectivo"
              count={formatPrice(totalCash)}
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="currency_exchange_icon"
              title="Transferencias"
              count={formatPrice(totalTransfer)}
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="money_off_icon"
              title="Ordenes adeudadas"
              count={formatPrice(totalDebt)}
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title="daily sales"
                description={
                  <>
                    (<strong>+15%</strong>) increase in today sales.
                  </>
                }
                date="updated 4 min ago"
                chart={sales}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <CardTodayProducts listProducts={listProducts} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default DashboardToday;
