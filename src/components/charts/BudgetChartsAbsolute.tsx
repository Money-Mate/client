import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Budgets = {
  [key: string]: number;
};

const budgets = {
  Gaming: 80,
  Food: 300,
  Alcohol: 20,
};

const usedAmounts = {
  Gaming: 50,
  Food: 200,
  Alcohol: 10,
};
const highestBudget = Math.max(...Object.values(budgets));

const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
  scales: {
    y: {
      max: highestBudget,
    },
  },
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

function getChartData(budgets: Budgets, usedAmounts: Budgets): ChartData {
  const labels = Object.keys(budgets);

  const remainingData = labels.map((label) => {
    const budget = budgets[label];
    const usedAmount = usedAmounts[label] || 0;
    const remainingBudget = Math.max(budget - usedAmount, 0);

    return remainingBudget;
  });

  const spentData = labels.map((label) => {
    const budget = budgets[label];
    const usedAmount = usedAmounts[label] || 0;
    const percentSpent = Math.min((usedAmount / budget) * 100, 100);

    return usedAmount;
  });

  return {
    labels,
    datasets: [
      {
        label: "Remaining Budget",
        data: remainingData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Amount Spent",
        data: spentData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

export function BudgetChart() {
  const data = getChartData(budgets, usedAmounts);

  return <Bar options={options} data={data} />;
}
