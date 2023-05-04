import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartConfiguration } from "chart.js";
import { invests } from "../../../../data/Investdata";

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

  const skyColors = [
    "#082f49",
    "#0C4A6E",
    "#075985",
    "#0369A1",
    "#0284C7",
    "#0EA5E9",
    "#38BDF8",
    "#7DD3FC",
    "#BAE6FD",
    "#E0F2FE",
    "#F0F9FF",
  ];

  const tealcolors = [
    "#042f2e",
    "#134e4a",
    "#115e59",
    "#0f766e",
    "#0d9488",
    "#14b8a6",
    "#2dd4bf",
    "#5eead4",
    "#99f6e4",
    "#ccfbf1",
    "#f0fdfa",
  ];

  const stockColor = skyColors[2];
  const stockcolorHover = tealcolors[2];
  const kryptoColor = skyColors[3];
  const kryptoColorHover = tealcolors[3];
  const realEstateColor = skyColors[4];
  const realEstateColorHover = tealcolors[4];
  const edelmetalleColor = skyColors[5];
  const edelmetalleColorHover = tealcolors[5];

  
  const data = {
    labels: ["Stocks", "Krypto", "Real Estate", "Edelmetalle"],
    datasets: [
      {
        label: "Wert in €",
        data: [stocks, krypto, realEstate, edelmetalle],

        backgroundColor: [
          stockColor,
          kryptoColor,
          realEstateColor,
          edelmetalleColor,
        ],
        hoverBackgroundColor: [
          stockcolorHover,
          kryptoColorHover,
          realEstateColorHover,
          edelmetalleColorHover,
        ],
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
        position: "bottom",
        align: "center",
        labels: {
          color: "#fff",
        },
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
            .map((invest) => invest.value)
            // .sort((a, b) => b - a);
          innerDataNames = invests
            .filter((invest) => invest.type === "Stocks")
            .map((invest) => invest.name);
        } else if (label === "Krypto") {
          innerData = invests
            .filter((invest) => invest.type === "Krypto")
            .map((invest) => invest.value)
            // .sort((a, b) => b - a);
          innerDataNames = invests
            .filter((invest) => invest.type === "Krypto")
            .map((invest) => invest.name);
        } else if (label === "Real Estate") {
          innerData = invests
            .filter((invest) => invest.type === "Real Estate")
            .map((invest) => invest.value)
            // .sort((a, b) => b - a);
          innerDataNames = invests
            .filter((invest) => invest.type === "Real Estate")
            .map((invest) => invest.name);
        } else if (label === "Edelmetalle") {
          innerData = invests
            .filter((invest) => invest.type === "Edelmetalle")
            .map((invest) => invest.value)
            // .sort((a, b) => b - a);
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
              backgroundColor: skyColors,
              hoverBackgroundColor: tealcolors,
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
