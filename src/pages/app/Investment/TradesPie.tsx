import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { tealColors, skyColors } from "../../../context/Colors";

import { transactions } from "./Transaktionen";

ChartJS.register(ArcElement, Tooltip, Legend);

function TradesPie() {

let positiveSum = 0;
let negativeSum = 0;
for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "Trade") {
        if (transactions[i].value > 0) {
            positiveSum += transactions[i].value;
        } else {
            negativeSum += transactions[i].value;
        }
    }
}

  const data = {
    labels: ["negative Trades", "positive Trades"],
    datasets: [
      {
        label: "Wert in €",
        data: [`${negativeSum} `, `${positiveSum}`],
        backgroundColor: [skyColors[3], tealColors[3]],
        borderColor: [""],
        borderWidth: 0,
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

export default TradesPie;