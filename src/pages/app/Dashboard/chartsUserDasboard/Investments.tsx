import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartConfiguration } from 'chart.js';
import { invests } from "./Investdata";


interface InvestmentProps {
  setClickedData: Function
}

const Investments = ({setClickedData}: InvestmentProps) => {
  const stocks = invests.filter((invest) => invest.type === "Stocks").reduce((acc, curr) => acc + curr.value, 0);
  const krypto = invests.filter((invest) => invest.type === "Krypto").reduce((acc, curr) => acc + curr.value, 0);
  const realEstate = invests.filter((invest) => invest.type === "Real Estate").reduce((acc, curr) => acc + curr.value, 0);

  const data = {
    labels: ["Stocks", "Krypto", "Real Estate"],
    datasets: [
      {
        label: "total €",
        data: [stocks, krypto, realEstate],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
        let innerData: number[] = [];
        let innerDataName: string[] = [];
        if (label === "Stocks") {
          innerData = invests.filter((invest) => invest.type === "Stocks").map((invest) => invest.value);
        } else if (label === "Krypto") {
          innerData = invests.filter((invest) => invest.type === "Krypto").map((invest) => invest.value);
        } else if (label === "Real Estate") {
          innerData = invests.filter((invest) => invest.type === "Real Estate").map((invest) => invest.value);
          innerDataName = invests.filter((invest) => invest.type === "Real Estate").map((invest) => invest.name);

        }
        const value = data.datasets[0].data[index];
        console.log(value, label, innerData, innerDataName)
        setChartData({
          labels: innerDataName.length > 0 ? [...innerDataName, label] : [label],
          datasets: [
            {
              label: "Total Value",
              data: [value],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384"],
            },
            {
              label: innerDataName.length > 0 ? innerDataName[0] : "",
              data: innerData,
              backgroundColor: ["#008000", "#36A2EB", "#FFCE56"],
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
      <Doughnut data={chartData} />
    </>
  );
};

export default Investments;
