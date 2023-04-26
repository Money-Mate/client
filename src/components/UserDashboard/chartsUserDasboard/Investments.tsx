import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

interface InvestmentProps {
    setClickedData: Function
}

const Investments = ({setClickedData}: InvestmentProps) => {
  const stocks = 3000;
  const krypto = 2000;
  const realEstate = 4000;

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
 

  const options: any = {
    maintainAspectRatio: false,
    onClick: (event: InvestmentProps, elements: any) => {
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
              backgroundColor: ["#008000"],
              hoverBackgroundColor: ["#008000"],
            },
          ],
        })
       setClickedData({label, value})
      } else {
        setClickedData(undefined)
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
