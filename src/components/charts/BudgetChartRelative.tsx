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
      display: false,
      text: "Budgets",
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

  const percentSpentData = labels.map((label) => {
    const budget = budgets[label];
    const usedAmount = usedAmounts[label] || 0;
    const percentSpent = Math.min((usedAmount / budget) * 100, 100);

    return percentSpent;
  });

  return {
    labels,
    datasets: [
      {
        label: "Spent",
        data: percentSpentData,
        borderColor: "rgb(55, 99, 232)",
        backgroundColor: "rgba(55, 99, 232, 0.5)",
      },
    ],
  };
}

export function BudgetChart() {
  const data = getChartData(budgets, usedAmounts);

  return <Bar options={options} data={data} />;
}
