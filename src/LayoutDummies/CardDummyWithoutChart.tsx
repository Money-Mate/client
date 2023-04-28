// card dummy
import useDashboardStore from "../../context/DashbordStore";
import { formatNumber } from "../../utils/formatterFunctions";

// getting data from backend
const exampleData = () => {
  const exampleData = useDashboardStore(
    (state) => state.dashboardData?.bankBalance
  );

  if (exampleData === undefined) {
    return <div>Loading...</div>;
  }

  // return the card with styling
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
            {/* insert data here */}
            {formatNumber(exampleData)}
          </div>
          <div className="rounded-full bg-green-500 px-1.5 text-sm font-semibold text-white">
            {/* a pill if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default exampleData