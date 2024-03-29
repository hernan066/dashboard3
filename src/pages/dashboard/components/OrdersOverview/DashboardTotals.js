/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import CharBar1 from "pages/dashboard2/components/CharBar1";
import React, { useEffect, useState } from "react";
import { formatPrice } from "utils/formaPrice";
import { dateToLocalDate } from "utils/dateFormat";
import CharBar2 from "../Chart2/CharBar2";
import TotalProducts from "../TotalProducts/TotalProducts";
import TotalProductsProfit from "../TotalProducts/TotalProductsProfit";
import CharBar3 from "../Chart3/CharBar3";
import TotalClientsDebt from "../ClientDebt/TotalClientDebt";
import TotalClientsBuy from "../ClientBuy/TotalClientBuy";
import TotalClientsProfits from "../ClientProfit/TotalClientProfit";

function DashboardTotals({
  orders,
  clients,
  ordersByDays,
  reports,
  totalProducts,
  totalProducts2103,
  dataOrdersByMonth,
  dataClientsDebs,
  reportTotalClientBuy,
  dataCategory,
}) {
  const { sales, tasks } = reportsLineChartData;
  const [updateDate, setUpdateDate] = useState(null);

  const totalClients = clients.length;

  const { totalCash, totalDebt, totalSales, totalTransfer } = orders[0];

  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);

  const totalActivesClients = clients.filter((client) => client.active).length;

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="person_add"
              title="Clientes Activos"
              count={totalActivesClients}
              percentage={{
                color: "success",
                amount: "",
                label: `Total clientes ${totalClients}`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Ventas"
              count={formatPrice(totalSales)}
              percentage={{
                color: "success",
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
              icon="file_download_done_icon"
              title="Pagos clientes"
              count={formatPrice(totalCash + totalTransfer)}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="cancel_presentation_icon"
              title="Deudas clientes"
              count={formatPrice(totalDebt)}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="warning"
              icon="inventory"
              title="Stock Cajones de Pollo"
              count={dataCategory?.stock?.actualStock || 0}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="arrow_upward"
              title="Cajones de pollo vendidos hoy"
              count={dataCategory?.totalSell?.totalQuantitySell || 0}
              color="success"
              percentage={{
                color: "success",
                amount: "",
                label: `En Reparto ${
                  dataCategory?.totalSellLocal?.totalQuantityLocalSell || 0
                }, en Local ${
                  dataCategory?.totalSellLocal?.totalQuantityLocalSell
                    ? dataCategory.totalSell.totalQuantitySell -
                      dataCategory.totalSellLocal.totalQuantityLocalSell
                    : dataCategory?.totalSell?.totalQuantitySell || 0
                }`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="arrow_downward"
              title="Cajones de pollo comprados hoy"
              count={dataCategory?.totalBuy?.buyToday || 0}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <CharBar1 ordersByDays={ordersByDays} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <CharBar2 reports={reports} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={3}>
              <CharBar3 reports={dataOrdersByMonth} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <TotalProducts totalProducts={totalProducts} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TotalProductsProfit totalProducts={totalProducts2103} />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <TotalClientsDebt clients={dataClientsDebs} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TotalClientsBuy clients={reportTotalClientBuy} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TotalClientsProfits clients={reportTotalClientBuy} />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default DashboardTotals;
