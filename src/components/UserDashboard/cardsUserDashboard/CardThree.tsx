import useDashboardStore from "../../../context/DashbordStore";
import { formatNumber } from "../../../utils/IntlAPI";

const CardThree = () => {
  const scheduledDebit = useDashboardStore(
    (state) => state.dashboardData?.scheduledDebit
  );

  if (scheduledDebit === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-slate-800">
          geplante Abbuchungen
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-slate-400">
          März
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-slate-800">
            {formatNumber(scheduledDebit)}
          </div>
          <div className="rounded-full bg-green-500 px-1.5 text-sm font-semibold text-white">
            +0%
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
  );
};

export default CardThree;
