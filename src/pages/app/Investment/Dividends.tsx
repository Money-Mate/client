import { ChartData, ChartOptions } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { calculateDividendSum, invests } from "./Investdata";
import { transactions } from "./Transaktionen";

const getBarColors = (values: number[]): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    return value >= 0 ? `#14b8a6${opacity}` : `#0369a1${opacity}`;
  });
};

const Dividends = () => {
  let paidDividends = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "Dividend") {
      paidDividends += transactions[i].value;
    }
  }

  const dividends = Number(paidDividends.toFixed(2));
  const sumDividends = Number(calculateDividendSum(invests).toFixed(2));

  const data: ChartData<"bar"> = {
    labels: [""],
    datasets: [
      {
        label: "bereits erhalten",
        data: [dividends],
        backgroundColor: "#14b8a6",
      },
      {
        label: "insgesamt erwartet",
        data: [sumDividends],
        backgroundColor: getBarColors([sumDividends]),
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
          color: "#f1f5f9",
        },
      },
      x: {
        grid: {
          color: "#94a3b8",
        },
        ticks: {
          color: "#f1f5f9",
        },
      },
    },
  };

  return <Bar data={data} options={options} updateMode="resize" />;
};

export default Dividends;
