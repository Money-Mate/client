import useDashboardStore from "../../../context/DashbordStore";
import {formatNumber} from "../../../utils/IntlAPI";

const CardOne = () => {
  const bankBalance = useDashboardStore(
    (state) => state.dashboardData?.bankBalance
  );
  console.log(bankBalance)

  if (bankBalance === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-slate-800">
          Kontostand
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-slate-400">
          August 2023
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-slate-800">
            {formatNumber(bankBalance)}
          </div>
          <div className="rounded-full bg-green-500 px-1.5 text-sm font-semibold text-white">
            +29%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
