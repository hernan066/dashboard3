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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
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

const labels = ["23/02", "24/02", "25/02", "26/02", "27/02", "28/02", "01/03"];

export const data = {
  labels,
  datasets: [
    {
      label: "Pagos",
      data: [200000, 250000, 100000, 220000, 280000, 100000, 150000],
      backgroundColor: "rgba(85, 230, 18, 0.7)",
    },
    {
      label: "Deudas",
      data: [100000, 50000, 80000, 120000, 90000, 30000, 40000],
      backgroundColor: "rgba(230, 18, 18, 0.7)",
    },
  ],
};

function CharBar1() {
  return <Bar options={options} data={data} />;
}

export default CharBar1;
