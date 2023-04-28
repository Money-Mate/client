import { useEffect } from "react";
import BudgetExpenses from "../userDashboard/cardsUserDashboard/BudgetExpensesCard";
import SaldoLastSixMonth from "../userDashboard/cardsUserDashboard/SaldoLastSixMonthCard";
import Savings from "../userDashboard/cardsUserDashboard/SavingsCard";
import Investments from "../userDashboard/cardsUserDashboard/InvestmentsCard";
import BankBalance from "../userDashboard/cardsUserDashboard/BankBalanceCard";
import EmergencyCoins from "../userDashboard/cardsUserDashboard/EmergencyCoinsCard";
import Wishlist from "../userDashboard/cardsUserDashboard/WishlistCard";
import BalanceExpenses from "../userDashboard/cardsUserDashboard/BalanceExpensesCard";
import BalanceIncome from "../userDashboard/cardsUserDashboard/BalanceIncomeCard";
import useDashboardStore from "../../../context/DashbordStore";

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
        <BankBalance />
      </div>
      <div className="h-40  rounded-lg sm:col-span-4 lg:col-span-3">
        <BalanceIncome />
      </div>
      <div className="h-40 rounded-lg sm:col-span-4 lg:col-span-3">
        <BalanceExpenses />
      </div>
      <div className="h-40 rounded-lg sm:col-span-4 lg:col-span-3">
        <Savings />
      </div>
      <div className="h-80 rounded-lg sm:col-span-8 lg:col-span-9">
        <SaldoLastSixMonth />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-3">
        <Wishlist />
      </div>
      <div className="col-span-4 h-80 rounded-lg sm:col-span-4">
        <EmergencyCoins />
      </div>
      <div className="col-span-4 h-80 rounded-lg sm:col-span-4">
        <BudgetExpenses />
      </div>
      <div className="col-span-4 h-80 rounded-lg sm:col-span-4">
        <Investments />
      </div>
    </div>
  );
}

export default Dashboard;
