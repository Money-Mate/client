import TradesPie from "./TradesPie";
import { transactions } from "./Transaktionen";
import { formatNumber } from "../../../utils/formatterFunctions";

function Trades() {
  const totalSum = transactions.reduce((acc, curr) => {
    if (curr.type === "Trade") {
      return acc + curr.value;
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 text-center text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3">
        Trading
      </h2>
      <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
        Total: {formatNumber(totalSum)}
      </p>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <TradesPie />
      </div>
    </div>
  );
}

export default Trades;
