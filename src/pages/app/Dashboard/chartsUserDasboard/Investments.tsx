import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartConfiguration } from "chart.js";

interface InvestmentProps {
  setClickedData: Function;
}

const Investments = ({ setClickedData }: InvestmentProps) => {
  const stocks = 3000;
  const krypto = 2000;
  const realEstate = 4000;

  const data = {
    labels: ["Stocks", "Krypto", "Real Estate"],
    datasets: [
      {
        label: "total €",
        data: [stocks, krypto, realEstate],
        backgroundColor: ["#1C82BF", "#67a357", "#2dd4bf"],
        hoverBackgroundColor: ["#1C82BF", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const [chartData, setChartData] = useState(data);

  const options: ChartConfiguration["options"] = {
    maintainAspectRatio: false,
    onClick: (event: any, elements: any) => {
      if (elements.length > 0 && elements[0].index !== undefined) {
        const index = elements[0].index;
        const label = data.labels[index];
        const value = data.datasets[0].data[index];
        setChartData({
          labels: [label],
          datasets: [
            {
              label: "Asset Value",
              data: [value],
              backgroundColor: ["#67a357"],
              hoverBackgroundColor: ["#008000"],
            },
          ],
        });
        setClickedData({ label, value });
      } else {
        setClickedData(undefined);
        setChartData(data);
      }
    },
  };

  return (
    <>
      <Doughnut data={chartData} options={options} />
    </>
  );
};

export default Investments;
