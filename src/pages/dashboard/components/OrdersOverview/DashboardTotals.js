/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import CharBar1 from "pages/dashboard2/components/CharBar1";
import React from "react";
import { formatPrice } from "utils/formaPrice";
import OrdersOverview from ".";
import Projects from "../Projects";

function DashboardTotals({ orders, clients, ordersByDays }) {
  const { sales, tasks } = reportsLineChartData;

  const totalClients = clients.length;

  const totalBuy = orders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = orders.reduce((acc, curr) => acc + curr.payment.cash, 0);
  const totalTransfer = orders.reduce((acc, curr) => acc + curr.payment.transfer, 0);
  const totalDebt = orders.reduce((acc, curr) => acc + curr.payment.debt, 0);
  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="person_add"
              title="Clientes"
              count={totalClients}
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
              icon="leaderboard"
              title="Ventas"
              count={formatPrice(totalBuy)}
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
              icon="file_download_done_icon"
              title="Pagos clientes"
              count={formatPrice(totalCash + totalTransfer)}
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
              color="primary"
              icon="cancel_presentation_icon"
              title="Deudas clientes"
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
              <CharBar1 ordersByDays={ordersByDays} />
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
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default DashboardTotals;
