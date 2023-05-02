import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BudgetItems {
  [key: string]: number;
}

const budgetItems: BudgetItems = {
  Steam: 30,
  Food: 20,
  Rabbitfood: 10,
};

const options = {
  indexAxis: "y" as const,
  responsive: true,
  scales: {
    x: {
      max: 100,
    },
  },
  plugins: {
    legend: {
      position: "right" as const,
      display: false,
    },
  },
};

function getChartData() {
  const labels = Object.keys(budgetItems);

  const expensesData = labels.map((label) => {
    const percentSpent = budgetItems[label];
    return percentSpent;
  });

  return {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

export function BudgetChart() {
  const data = getChartData();

  return <Bar options={options} data={data} />;
}
