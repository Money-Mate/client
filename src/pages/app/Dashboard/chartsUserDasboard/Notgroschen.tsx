import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Sparen", "Erfüllt"],
  datasets: [
    {
      label: "%",
      data: [33, 66],
      backgroundColor: ["rgba(0,0,0, 0)", "#1C82BF"],
      borderColor: ["rgba(0,0,0, 0)", "#1C82BF"],
    },
  ],
};

function Notgroschen() {
  return <Pie data={data} options={{ maintainAspectRatio: false }} />;
}

export default Notgroschen;
