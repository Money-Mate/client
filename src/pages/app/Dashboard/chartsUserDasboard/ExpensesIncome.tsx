import { ChartData, ChartOptions } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

interface DataItem {
  income: number;
  expenses: number;
}

const getBarColors = (values: number[]): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    return value >= 0 ? `#14b8a6${opacity}` : `#0369a1${opacity}`;
  });
};

const ExpenseIncomeChart = () => {
  const [data, setData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        backgroundColor: getBarColors([]),
      },
      {
        label: "Expenses",
        data: [],
        backgroundColor: getBarColors([]),
      },
    ],
  });

  useEffect(() => {
    setData((prevData) => {
      const newData: ChartData<"bar"> = {
        ...prevData,
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [0, 0, 0, 0, 0],
            backgroundColor: getBarColors([0, 0, 0, 0, 0]),
          },
          {
            ...prevData.datasets[1],
            data: [0, 0, 0, 0, 0],
            backgroundColor: getBarColors([0, 0, 0, 0, 0]),
          },
        ],
      };
      return newData;
    });
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
        ticks: {
          callback: function (value) {
            return "€" + value;
          },
          color: "#94a3b8",
        },
      },
      x: {
        ticks: {
          color: "#94a3b8",
        },
      },
    },
  };

  return <Bar data={data} options={options} updateMode="resize" />;
};

export default ExpenseIncomeChart;
