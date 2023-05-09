import { ChartData, ChartOptions } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useDashboardStore from "../../../../context/DashboardStore";

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

const getBarColors = (values: number[], color: string): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    return value >= 0 ? `${color}${opacity}` : `${color}${opacity}`;
  });
};

const generateExpenseIncomeChartData = (expensesIncome: {
  data: { income: number[]; expenses: number[] };
  labels: string[];
}): ExpenseIncomeChartData => {
  const incomes = expensesIncome.data.income;
  const expenses = expensesIncome.data.expenses;
  const labels = expensesIncome.labels;

  const greenColors = getBarColors(incomes, "#14b8a6");
  const blueColors = getBarColors(expenses, "#0369a1");

  return {
    labels,
    datasets: [
      {
        label: "Einnahmen",
        data: incomes,
        backgroundColor: greenColors,
      },
      {
        label: "Ausgaben",
        data: expenses,
        backgroundColor: blueColors,
      },
    ],
  };
};

const ExpenseIncomeChart = () => {
  const expensesIncome = useDashboardStore(
    (state) => state.dashboardData?.lastSixMonthsIncomeAndExpenses
  );
  if (expensesIncome === undefined) {
    return <div>Loading...</div>;
  }
  const [data, setData] = useState<ExpenseIncomeChartData>(
    generateExpenseIncomeChartData(expensesIncome)
  );

  useEffect(() => {
    setData(generateExpenseIncomeChartData(expensesIncome));
  }, [expensesIncome]);

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
