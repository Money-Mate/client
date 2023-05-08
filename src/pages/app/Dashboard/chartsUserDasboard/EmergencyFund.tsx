import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import useDashboardStore from "../../../../context/DashboardStore";

ChartJS.register(ArcElement, Tooltip, Legend);

function Notgroschen() {
  const emergencyFund = useDashboardStore(
    (state) => state.dashboardData?.emergencyFundPercent
  );
  const toBeFilled = emergencyFund ? 100 - emergencyFund : 100;

  const data = {
    labels: ["% zu sparen", "% erfüllt"],
    datasets: [
      {
        // label: "%",
        data: [`${toBeFilled} `, `${emergencyFund}`],
        backgroundColor: ["rgba(0,0,0, 0)", "#14b8a6"],
        borderColor: ["rgba(0,0,0, 0)", "#0d9488"],
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      }}
    />
  );
}

export default Notgroschen;
