import { useEffect } from "react";
import CardEightBudget from "../components/UserDashboard/cardsUserDashboard/CardEightBudget";
import CardFiveSaldo from "../components/UserDashboard/cardsUserDashboard/CardFiveSaldo";
import CardFour from "../components/UserDashboard/cardsUserDashboard/CardFour";
import CardOne from "../components/UserDashboard/cardsUserDashboard/CardOne";
import CardSevenNotgroschen from "../components/UserDashboard/cardsUserDashboard/CardSevenNotgroschen";
import CardSixSavingGoals from "../components/UserDashboard/cardsUserDashboard/CardSixSavingGoals";
import CardThree from "../components/UserDashboard/cardsUserDashboard/CardThree";
import CardTwo from "../components/UserDashboard/cardsUserDashboard/CardTwo";
import useDashboardStore from "../context/DashbordStore";

function Dashboard() {
  const { dashboardData, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid lg:grid-cols-12 sm:grid-cols-8 grid-rows-4 gap-4 p-5">
      <div className="col-span-3 bg-neutral-400 rounded-lg">
        <CardOne />
      </div>
      <div className="col-span-3  bg-neutral-400 rounded-lg">
        <CardTwo />
      </div>
      <div className="col-span-3 bg-neutral-400 rounded-lg">
        <CardThree />
      </div>
      <div className="col-span-3 bg-neutral-400 rounded-lg">
        <CardFour />
      </div>
      <div className="col-span-9 row-span-2 bg-neutral-400 rounded-lg">
        <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
          <h2 className="text-lg font-semibold text-slate-800 m-2 text-center">
            Saldo der letzten 6 Monate
            <CardFiveSaldo />
          </h2>
        </div>
      </div>
      <div className="col-span-3 row-span-2 bg-neutral-400 rounded-lg">
        <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
          <h2 className="text-lg font-semibold text-slate-800 m-2">
            Wunschliste
            <CardSixSavingGoals />
          </h2>
        </div>
      </div>
      <div className="col-span-4 bg-neutral-400 rounded-lg">
        <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
          <h2 className="text-lg font-semibold text-slate-800 m-2">
            Notgroschen
          </h2>

          <CardSevenNotgroschen />
        </div>
      </div>
      <div className="col-span-4 bg-neutral-400 rounded-lg">
        <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
          <h2 className="text-lg font-semibold text-slate-800 m-2">Budget</h2>
          <CardEightBudget />
        </div>
      </div>
      <div className="col-span-4 bg-neutral-400 rounded-lg">
        <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
          <h2 className="text-lg font-semibold text-slate-800 m-2">
            Investments
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
