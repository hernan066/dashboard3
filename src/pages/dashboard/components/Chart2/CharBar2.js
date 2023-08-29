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

function CharBar2({ reports }) {
  const arr = reports
    .map((item) => ({
      date: new Date(item.date),
      totalProfit: item.totalProfits,
    }))
    .sort((a, b) => a.date - b.date);

  // const info = getChartData(ordersByDays);
  const labels = arr.map((label) => dateToLocalDateMin(label.date)).slice(1, arr.length);

  const profits = arr.map((profit) => profit.totalProfit).slice(1, arr.length);

  const data = {
    labels,
    datasets: [
      {
        label: "Ganancia",
        data: profits,
        backgroundColor: "#ddd",
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
              bgColor="success"
              borderRadius="lg"
              coloredShadow="dark"
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
            Ganancias
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            Total de los últimos 30 días.
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

export default CharBar2;
