/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "@mui/material";
import { dateToLocalDateMin } from "utils/dateFormat";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Total Cajones Vendidos los últimos 30 días",
    },
    datalabels: {
      color: "transparent",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function Chart1({ dataCategoryByDay }) {
  const days = new Set(dataCategoryByDay.map((data) => data.date));

  const filterDays = [...days];

  const res = filterDays.map((date) => ({
    date,
    zona1:
      dataCategoryByDay.filter((data) => data.deliveryZone === "Zona 1" && data.date === date)[0]
        ?.totalQuantitySell || 0,
    zona2:
      dataCategoryByDay.filter((data) => data.deliveryZone === "Zona 2" && data.date === date)[0]
        ?.totalQuantitySell || 0,
    zona3:
      dataCategoryByDay.filter((data) => data.deliveryZone === "Zona 3" && data.date === date)[0]
        ?.totalQuantitySell || 0,
    zona4:
      dataCategoryByDay.filter((data) => data.deliveryZone === "Zona 4" && data.date === date)[0]
        ?.totalQuantitySell || 0,
    zona5:
      dataCategoryByDay.filter((data) => data.deliveryZone === "Zona 5" && data.date === date)[0]
        ?.totalQuantitySell || 0,
    zona6:
      dataCategoryByDay.filter((data) => data.deliveryZone === "Zona 6" && data.date === date)[0]
        ?.totalQuantitySell || 0,
  }));

  const formatData = res
    .map((data) => ({
      ...data,
      date: new Date(data.date),
    }))
    .sort((a, b) => a.date - b.date);

  const data = {
    labels: formatData.map((label) => dateToLocalDateMin(label.date)),
    datasets: [
      {
        label: "Zona 1",
        data: formatData.map((d) => d.zona1),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Zona 2",
        data: formatData.map((d) => d.zona2),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Zona 3",
        data: formatData.map((d) => d.zona3),
        backgroundColor: "rgba(255, 206, 86, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Zona 4",
        data: formatData.map((d) => d.zona4),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Zona 5",
        data: formatData.map((d) => d.zona5),
        backgroundColor: "rgba(153, 102, 255, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Zona 6",
        data: formatData.map((d) => d.zona6),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        stack: "Stack 0",
      },
    ],
  };

  return (
    <Card sx={{ height: "100%", padding: "15px" }}>
      <Bar options={options} data={data} />
    </Card>
  );
}
