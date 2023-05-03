import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js/auto";
import { useEffect, useState } from "react";

interface ExpenseIncomeChartData extends ChartData<"bar"> {
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
    },
    {
      label: string;
      data: number[];
      backgroundColor: string[];
    }
  ];
}

interface DataItem {
  income: number;
  expenses: number;
}

const getBarColors = (values: number[], isSecondDataset: boolean): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    const color = value >= 0 ? "#14b8a6" : "#0369a1";
    if (isSecondDataset && index === values.length - 1) {
      return `${color}${opacity}`;
    } else {
      return `${color}ff`;
    }
  });
};

const generateExpenseIncomeChartData = (): ExpenseIncomeChartData => {
  const labels = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"];
  const incomes = [1, 2, 3, 4, 5];
  const expenses = [5, 4, 3, 2, 1];

  return {
    labels,
    datasets: [
      {
        label: "Einnahmen",
        data: incomes,
        backgroundColor: getBarColors(incomes, false),
      },
      {
        label: "Ausgaben",
        data: expenses,
        backgroundColor: getBarColors(expenses, true),
      },
    ],
  };
};

const ExpenseIncomeChart = () => {
  const [data, setData] = useState<ExpenseIncomeChartData>(
    generateExpenseIncomeChartData()
  );

  useEffect(() => {
    setData(generateExpenseIncomeChartData());
  }, []);

  const options: ChartOptions<"bar"> = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
      },
    },
    scales: {
      y: {
        grid: {
          color: "#94a3b8",
        },
        ticks: {
          callback: (value) => `€${value}`,
          color: "#94a3b8",
        },
      },
      x: {
        grid: {
          color: "#94a3b8",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
  };

  return <Bar data={data} options={options} updateMode="resize" />;
};

export default ExpenseIncomeChart;
