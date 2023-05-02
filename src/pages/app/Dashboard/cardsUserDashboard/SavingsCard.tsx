import useDashboardStore from "../../../../context/DashbordStore";
import { formatNumber } from "../../../../utils/formatterFunctions";

const Savings = () => {
  const saved = useDashboardStore((state) => state.dashboardData?.saved);

  if (saved === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-full rounded-md bg-mm-foreground shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-mm-text-white">Erspartes</h2>
        <div className="mb-1 text-xs font-semibold uppercase text-slate-400">
          April
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-mm-text-white">
            {formatNumber(saved)}
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
  );
};

export default Savings;
