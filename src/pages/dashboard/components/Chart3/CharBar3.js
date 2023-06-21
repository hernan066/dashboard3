/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { dateToLocalDate, dateToLocalDateMin } from "utils/dateFormat";
import { formatQuantity } from "utils/quantityFormat";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: "transparent",
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    y: {
      grid: {
        drawBorder: false,
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        borderDash: [5, 5],
        color: "rgba(255, 255, 255, .2)",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 500,
        beginAtZero: true,
        padding: 10,
        font: {
          size: 14,
          weight: 300,
          family: "Roboto",
          style: "normal",
          lineHeight: 2,
        },
        color: "#fff",
      },
    },
    x: {
      grid: {
        drawBorder: false,
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        borderDash: [5, 5],
        color: "rgba(255, 255, 255, .2)",
      },
      ticks: {
        display: true,
        color: "#f8f9fa",
        padding: 10,
        font: {
          size: 14,
          weight: 300,
          family: "Roboto",
          style: "normal",
          lineHeight: 2,
        },
      },
    },
  },
};

function CharBar3({ reports }) {
  console.log(reports);

  const arr = reports
    .map((item) => ({
      date: new Date(item.date),
      totalProfit: item.totalProfits,
    }))
    .sort((a, b) => a.date - b.date);

  // const info = getChartData(ordersByDays);

  const labels = ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"];
  const totalSell = reports.map((item) => item.totalSell);
  const totalCost = reports.map((item) => item.totalCost);
  const totalProfits = reports.map((item) => item.totalProfits);
  const totalProfitsPercentage = reports.map((item) => (item.totalProfits * 100) / item.totalCost);

  console.log(totalProfitsPercentage);

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: totalSell,
        backgroundColor: "rgba(3, 202, 252, 0.8)",
      },
      {
        label: "Costo",
        data: totalCost,
        backgroundColor: "rgba(230, 18, 18, 0.7)",
      },
      {
        label: "Ganancia",
        data: totalProfits,
        backgroundColor: "rgba(85, 230, 18, 0.7)",
      },
      {
        label: "Ganancia%",
        data: totalProfitsPercentage,
        backgroundColor: "rgba(3, 252, 157, 0.7)",
      },
    ],
  };
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor="dark"
              borderRadius="lg"
              coloredShadow="info"
              py={2}
              pr={0.5}
              mt={-5}
              /* height="16rem" */
            >
              <Bar options={options} data={data} />
            </MDBox>
          ),
          []
        )}
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            Totales mensuales
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            Total desde el 21/03/2023
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              Last update {dateToLocalDate(new Date())}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default CharBar3;
