import LoadingSymbol from "../../../../components/LoadingSymbol";
import useDashboardStore from "../../../../context/DashboardStore";
import { formatNumber } from "../../../../utils/formatterFunctions";

const bankBalance = () => {
  const bankBalance = useDashboardStore(
    (state) => state.dashboardData?.bankBalance
  );

  if (bankBalance === undefined) {
    return < LoadingSymbol />;
  }

  return (
    <div className=" h-full rounded-md bg-mm-foreground shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-mm-text-white">
          Kontostand
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-mm-text-dark">
          August 2023
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-mm-text-white">
            {formatNumber(bankBalance)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default bankBalance;
