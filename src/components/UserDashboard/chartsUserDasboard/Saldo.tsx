import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js/auto";
import useDashboardStore from "../../../context/DashbordStore";

const getBarColors = (values: number[]): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    return value >= 0 ? `#2ECC40${opacity}` : `#FF4136${opacity}`;
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
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Saldo Chart",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "€" + value;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Saldo;
