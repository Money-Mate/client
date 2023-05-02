import useDashboardStore from "../../../../context/DashbordStore";
import { formatNumber } from "../../../../utils/formatterFunctions";

const BalanceIncome = () => {
  const balanceEndOfMonth = useDashboardStore(
    (state) => state.dashboardData?.balanceEndOfMonth
  );

  if (balanceEndOfMonth === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-full rounded-md  bg-mm-foreground shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-mm-text-white">
          geplante Eingänge
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-mm-text-dark">
          März
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-mm-text-white">
            {formatNumber(balanceEndOfMonth)}
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
  );
};

export default BalanceIncome;
