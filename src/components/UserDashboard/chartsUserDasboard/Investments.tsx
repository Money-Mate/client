import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import doughnutlabel from "react-chartjs-2"

const DoughnutChart = () => {
    
    
    const data = {
        labels: ["Stocks", "Krypto", "Real Estate"],
        datasets: [
            {
                label: "total €",
                data: [3000, 2000, 4000],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };
    
    const [chartData, setChartData] = useState(data);


function sumData() {
        const dataValues = data.datasets[0].data;
        const sum = dataValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(sum);
        return sum;
      }
        const sum = sumData();




  const options: any  = {
    maintainAspectRatio: false,
    cutoutPercentage: 60,
  onRender: function (chart:any) {
    const width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    const text = `€${sum}`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },plugins: {
    doughnutlabel: {
      labels: [
        {
          text: `€${sum}`,
          font: {
            size: "30"
          },
          color: "#000000"
        }
      ]
    },
  
    beforeDraw: function (chart:any) {
      const ctx = chart.canvas.getContext("2d");
      ctx.fillStyle = "rgba(255, 255, 255, 0)";
      ctx.fillRect(0, 0, chart.width, chart.height);
    }
  },
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
              backgroundColor: ["#008000"],
              hoverBackgroundColor: ["#008000"],
            },
          ],
        });
      } else {
        setChartData(data);
      }
    },
  };

return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
