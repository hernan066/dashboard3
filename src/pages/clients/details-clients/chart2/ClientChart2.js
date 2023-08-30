/* eslint-disable no-unreachable-loop */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { dateToLocalDate } from "utils/dateFormat";
import { arrLastXdays } from "utils/arrLastXdays";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
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

function ClientChart2({ dataClientBuyByDay }) {
  const labels = arrLastXdays(30);

  const finalData = labels.map((day) => {
    for (let i = 0; i < dataClientBuyByDay.length; i++) {
      if (day === dataClientBuyByDay[i].date) {
        return {
          ...dataClientBuyByDay[i],
        };
      }
    }
    return {
      ...dataClientBuyByDay[0],
      date: day,
      totalCost: 0,
      totalBuy: 0,
      totalProfits: 0,
    };
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Total ganancia",
        data: finalData.map((d) => d.totalProfits),
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              py={2}
              pr={0.5}
              mt={-5}
              /* height="16rem" */
            >
              <Line options={options} data={data} />
            </MDBox>
          ),
          []
        )}
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            Gráfico de ganancias
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

export default ClientChart2;
