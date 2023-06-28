/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { formatPrice } from "utils/formaPrice";
import { useEffect, useState } from "react";
import { dateToLocalDate } from "utils/dateFormat";
import CardTodayProducts from "./CardTodayProducts";
import MapDelivery from "./MapDelivery";

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

function DashboardToday({ orders, activeOrders }) {
  console.log(activeOrders);
  const [updateDate, setUpdateDate] = useState(null);
  // console.log(orders);

  const totalBuy = activeOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = activeOrders.reduce((acc, curr) => acc + curr.payment.cash, 0);
  const totalTransfer = activeOrders.reduce((acc, curr) => acc + curr.payment.transfer, 0);
  const totalDebt = activeOrders.reduce((acc, curr) => acc + curr.payment.debt, 0);

  const deliveredOrders = activeOrders.filter((order) => order.status === "Entregado");
  const pendingOrders = activeOrders.filter((order) => order.status === "Pendiente");
  const refusedOrders = activeOrders.filter((order) => order.status === "Rechazado");

  const listProducts = repeatSum(getListProducts(activeOrders));

  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);
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
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Ventas"
              count={formatPrice(totalBuy)}
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
        <Grid item xs={12} md={6} lg={3}>
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
        <Grid item xs={12} md={6} lg={3}>
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
      <MDBox my={4.5}>
        <Card>
          <MapDelivery orders={orders} />
        </Card>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <CardTodayProducts listProducts={listProducts} />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default DashboardToday;
