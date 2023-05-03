import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["nicht erfüllt", "erfüllt"],
  datasets: [
    {
      label: "%",
      data: [33, 66],
      backgroundColor: ["rgba(0,0,0, 0)", "#0d9488"],
      borderColor: ["rgba(0,0,0, 0)", "#0d9488"],
    },
  ],
};

function Notgroschen() {
  return <Pie data={data} options={{ maintainAspectRatio: false, plugins: {legend: {display: false}} }} />;
}

export default Notgroschen;
