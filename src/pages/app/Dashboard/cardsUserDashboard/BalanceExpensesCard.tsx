import LoadingSymbol from "../../../../components/LoadingSymbol";
import useDashboardStore from "../../../../context/DashboardStore";
import { formatNumber } from "../../../../utils/formatterFunctions";

const BalanceExpenses = () => {
  const scheduledDebit = useDashboardStore(
    (state) => state.dashboardData?.scheduledDebit
  );

  if (scheduledDebit === undefined) {
    return <LoadingSymbol/>;
  }

  return (
    <div className=" h-full rounded-md bg-mm-foreground">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-mm-text-white">
          geplante Abbuchungen
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-mm-text-dark">
          März
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-mm-text-white">
            {formatNumber(scheduledDebit)}
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
  );
};

export default BalanceExpenses;
