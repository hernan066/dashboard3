/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "@mui/material";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Total Cajones Vendidos hoy",
      legend: {
        display: true,
      },
    },
    datalabels: {
      color: "#333",
    },
  },
  responsive: true,
};

export function Chart2({ dataCategoryByDay }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const zona1 =
    dataCategoryByDay.filter(
      (data) => data.date === `${month}-${day}-${year}` && data.deliveryZone === "Zona 1"
    )[0]?.totalQuantitySell || 0;
  const zona2 =
    dataCategoryByDay.filter(
      (data) => data.date === `${month}-${day}-${year}` && data.deliveryZone === "Zona 2"
    )[0]?.totalQuantitySell || 0;
  const zona3 =
    dataCategoryByDay.filter(
      (data) => data.date === `${month}-${day}-${year}` && data.deliveryZone === "Zona 3"
    )[0]?.totalQuantitySell || 0;
  const zona4 =
    dataCategoryByDay.filter(
      (data) => data.date === `${month}-${day}-${year}` && data.deliveryZone === "Zona 4"
    )[0]?.totalQuantitySell || 0;
  const zona5 =
    dataCategoryByDay.filter(
      (data) => data.date === `${month}-${day}-${year}` && data.deliveryZone === "Zona 5"
    )[0]?.totalQuantitySell || 0;
  const zona6 =
    dataCategoryByDay.filter(
      (data) => data.date === `${month}-${day}-${year}` && data.deliveryZone === "Zona 6"
    )[0]?.totalQuantitySell || 0;

  console.log(zona1);
  const data = {
    labels: ["Zona 1", "Zona 2", "Zona 3", "Zona 4", "Zona 5", "Zona 6"],
    datasets: [
      {
        label: "Vendidos",
        data: [zona1, zona2, zona3, zona4, zona5, zona6],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ height: "100%", padding: "15px" }}>
      <Pie data={data} options={options} />
    </Card>
  );
}
