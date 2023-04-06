import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["", "Verfügbar"],
  datasets: [
    {
      label: "%",
      data: [33, 66],
      backgroundColor: ["rgba(0,0,0, 0)", "rgba(239, 68, 68, 1)"],
      borderColor: ["rgba(0,0,0, 0)", "rgba(255, 99, 132, 1)"],
    },
  ],
};

function Notgroschen() {
  return <Pie data={data} />;
}

export default Notgroschen;
