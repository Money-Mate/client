import LoadingSymbol from "../../../../components/LoadingSymbol";
import useDashboardStore from "../../../../context/DashboardStore";
import { formatNumber } from "../../../../utils/formatterFunctions";

const BalanceIncome = () => {
  const balanceEndOfMonth = useDashboardStore(
    (state) => state.dashboardData?.balanceEndOfMonth
  );

  if (balanceEndOfMonth === undefined) {
    return <LoadingSymbol />
  }

  return (
    <div className=" h-full rounded-md  bg-mm-foreground shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent">
          geplante Eingänge
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-mm-text-dark">
          Mai 2023
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-mm-text-white">
            {/* {formatNumber(balanceEndOfMonth)} */}
            0 €
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
  );
};

export default BalanceIncome;
