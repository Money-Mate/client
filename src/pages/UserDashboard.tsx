import { useEffect } from "react";
import CardEightBudget from "../components/UserDashboard/cardsUserDashboard/CardEightBudget";
import CardFiveSaldo from "../components/UserDashboard/cardsUserDashboard/CardFiveSaldo";
import CardFour from "../components/UserDashboard/cardsUserDashboard/CardFour";
import CardNineInvestments from "../components/UserDashboard/cardsUserDashboard/CardNineInvestments";
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
    <div className="mx-5 mb-5 grid min-h-fit gap-4 pt-3 sm:grid-cols-8 lg:grid-cols-12">
      <div className="h-40 rounded-lg sm:col-span-4 lg:col-span-3">
        <CardOne />
      </div>
      <div className="h-40  rounded-lg sm:col-span-4 lg:col-span-3">
        <CardTwo />
      </div>
      <div className="h-40 rounded-lg sm:col-span-4 lg:col-span-3">
        <CardThree />
      </div>
      <div className="h-40 rounded-lg sm:col-span-4 lg:col-span-3">
        <CardFour />
      </div>
      <div className="h-80 rounded-lg sm:col-span-8 lg:col-span-9">
        <CardFiveSaldo />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-3">
        <CardSixSavingGoals />
      </div>
      <div className="col-span-4 h-80 rounded-lg sm:col-span-4">
        <CardSevenNotgroschen />
      </div>
      <div className="col-span-4 h-80 rounded-lg sm:col-span-4">
        <CardEightBudget />
      </div>
      <div className="col-span-4 h-80 rounded-lg sm:col-span-4">
        <CardNineInvestments />
      </div>
    </div>
  );
}

export default Dashboard;
