import useDashboardStore from "../../context/DashbordStore";

const CardOne = () => {
  const bankBalance = useDashboardStore(
    (state) => state.dashboardData?.bankBalance
  );

  if (!bankBalance) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
      <div className="px-5 pt-3">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Kontostand
        </h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          August 2023
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 m-2">
            {bankBalance}
          </div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +29%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
