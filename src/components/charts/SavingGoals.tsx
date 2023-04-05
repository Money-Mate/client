import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type SavingsGoals = {
  [key: string]: number;
};

const savingsGoals: SavingsGoals = {
  "New Car": 20000,
  Vacation: 5000,
  "Emergency Fund": 10000,
};

const fixedSavedAmount = 1000;

const highestSavingGoal = Math.max(...Object.values(savingsGoals));

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
      display: false,

    },
    title: {
      display: false,
      text: "Savings Goals",
    },
  },
  scales: {
    x: {
      max: 100,
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

function getChartData(
  savingsGoals: SavingsGoals,
  fixedSavedAmount: number
): ChartData {
  const labels = Object.keys(savingsGoals);

  const savingsData = labels.map((label) => {
    const savingGoal = savingsGoals[label];
    const savedAmount = fixedSavedAmount;
    const percentSaved = Math.min((savedAmount / savingGoal) * 100, 100);

    return percentSaved;
  });

  return {
    labels,
    datasets: [
      {
        label: "Savings",
        data: savingsData,
        borderColor: "rgb(55, 199, 132)",
        backgroundColor: "rgba(55, 199, 132, 0.5)",
      },
    ],
  };
}

export function SavingGoalsChart() {
  const data = getChartData(savingsGoals, fixedSavedAmount);

  return <Bar options={options} data={data} />;
}
