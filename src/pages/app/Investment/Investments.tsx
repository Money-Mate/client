import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartConfiguration } from "chart.js";
import { invests } from "./Investdata";
import { tealColors, skyColors } from "../../../context/Colors";

interface InvestmentProps {
  setClickedData: Function;
}

const Investments = ({ setClickedData }: InvestmentProps) => {
  const stocks = invests
    .filter((invest) => invest.type === "Stocks")
    .reduce((acc, curr) => acc + curr.value, 0);
  const krypto = invests
    .filter((invest) => invest.type === "Krypto")
    .reduce((acc, curr) => acc + curr.value, 0);
  const realEstate = invests
    .filter((invest) => invest.type === "Real Estate")
    .reduce((acc, curr) => acc + curr.value, 0);
  const edelmetalle = invests
    .filter((invest) => invest.type === "Edelmetalle")
    .reduce((acc, curr) => acc + curr.value, 0);

  const data = {
    labels: ["Stocks", "Krypto", "Real Estate", "Edelmetalle"],
    datasets: [
      {
        label: "Wert in €",
        data: [stocks, krypto, realEstate, edelmetalle],
        backgroundColor: skyColors.map((color) => color),
        hoverBackgroundColor: tealColors.map((color) => color),
        borderColor: [""],
        borderWidth: 0,
      },
    ],
  };

  const [chartData, setChartData] = useState(data);

  const options: ChartConfiguration["options"] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0 && elements[0].index !== undefined) {
        const index = elements[0].index;
        const label = data.labels[index];
        let innerData: number[] = [];
        let innerDataNames: string[] = [];
        if (label === "Stocks") {
          innerData = invests
            .filter((invest) => invest.type === "Stocks")
            .map((invest) => invest.value);
          innerDataNames = invests
            .filter((invest) => invest.type === "Stocks")
            .map((invest) => invest.name);
        } else if (label === "Krypto") {
          innerData = invests
            .filter((invest) => invest.type === "Krypto")
            .map((invest) => invest.value);
          innerDataNames = invests
            .filter((invest) => invest.type === "Krypto")
            .map((invest) => invest.name);
        } else if (label === "Real Estate") {
          innerData = invests
            .filter((invest) => invest.type === "Real Estate")
            .map((invest) => invest.value);
          innerDataNames = invests
            .filter((invest) => invest.type === "Real Estate")
            .map((invest) => invest.name);
        } else if (label === "Edelmetalle") {
          innerData = invests
            .filter((invest) => invest.type === "Edelmetalle")
            .map((invest) => invest.value);
          innerDataNames = invests
            .filter((invest) => invest.type === "Edelmetalle")
            .map((invest) => invest.name);
        }
        const value = data.datasets[0].data[index];

        setChartData({
          labels: innerDataNames.length > 0 ? [...innerDataNames] : [label],
          datasets: [
            {
              label: "Wert in €",
              data: innerData,
              backgroundColor: skyColors.map((color) => color),
              hoverBackgroundColor: tealColors.map((color) => color),
              borderColor: [""],
              borderWidth: 0,
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
