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
    .filter((invest) => invest.type === "Aktien/ETF's")
    .reduce((acc, curr) => acc + (curr.value * curr.amount), 0);
  const crypto = invests
    .filter((invest) => invest.type === "Kryptowährungen")
    .reduce((acc, curr) => acc + (curr.value * curr.amount), 0);
  const realEstate = invests
    .filter((invest) => invest.type === "Immobilien")
    .reduce((acc, curr) => acc + (curr.value * curr.amount), 0);
  const commodities = invests
    .filter((invest) => invest.type === "Rohstoffe")
    .reduce((acc, curr) => acc + (curr.value * curr.amount), 0);

  const data = {
    labels: ["Aktien/ETF's", "Kryptowährungen", "Immobilien", "Rohstoffe"],
    datasets: [
      {
        label: "Wert in €",
        data: [stocks, crypto, realEstate, commodities],
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
        if (label === "Aktien/ETF's") {
          innerData = invests
            .filter((invest) => invest.type === "Aktien/ETF's")
            .map((invest) => invest.value * invest.amount);
          innerDataNames = invests
            .filter((invest) => invest.type === "Aktien/ETF's")
            .map((invest) => invest.name);
        } else if (label === "Kryptowährungen") {
          innerData = invests
            .filter((invest) => invest.type === "Kryptowährungen")
            .map((invest) => invest.value * invest.amount);
          innerDataNames = invests
            .filter((invest) => invest.type === "Kryptowährungen")
            .map((invest) => invest.name);
        } else if (label === "Immobilien") {
          innerData = invests
            .filter((invest) => invest.type === "Immobilien")
            .map((invest) => invest.value * invest.amount);
          innerDataNames = invests
            .filter((invest) => invest.type === "Immobilien")
            .map((invest) => invest.name);
        } else if (label === "Rohstoffe") {
          innerData = invests
            .filter((invest) => invest.type === "Rohstoffe")
            .map((invest) => invest.value * invest.amount);
          innerDataNames = invests
            .filter((invest) => invest.type === "Rohstoffe")
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
