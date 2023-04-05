import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface SavingsGoals {
  [key: string]: number;
}

const savingsGoals: SavingsGoals = {
  "New Car": 22,
  Vacation: 53,
  "Emergency Fund": 10,
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
  const labels = Object.keys(savingsGoals);

  const savingsData = labels.map((label) => {
    const percentSaved = savingsGoals[label];
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
  const data = getChartData();

  return <Bar options={options} data={data} />;
}
