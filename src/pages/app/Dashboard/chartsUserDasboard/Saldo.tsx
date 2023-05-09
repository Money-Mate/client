import { ChartData, ChartOptions } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useDashboardStore from "../../../../context/DashboardStore";

const getBarColors = (values: number[]): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    return value >= 0 ? `#14b8a6${opacity}` : `#0369a1${opacity}`;
  });
};

const Saldo = () => {
  const lastSixMonthsBalance = useDashboardStore(
    (state) => state.dashboardData?.lastSixMonthsBalance
  );

  const data: ChartData<"bar"> = {
    labels: lastSixMonthsBalance?.labels ?? [],
    datasets: [
      {
        label: "Saldo",
        data: lastSixMonthsBalance?.data ?? [],
        backgroundColor: getBarColors(lastSixMonthsBalance?.data ?? []),
      },
    ],
  };

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
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "#94a3b8",
        },
        ticks: {
          callback: function (value) {
            return "€" + value;
          },
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

export default Saldo;
