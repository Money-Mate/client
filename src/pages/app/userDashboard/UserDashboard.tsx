import { useEffect } from "react";
import BudgetExpenses from "../../../components/UserDashboard/cardsUserDashboard/BudgetExpensesCard";
import SaldoLastSixMonth from "../../../components/UserDashboard/cardsUserDashboard/SaldoLastSixMonthCard";
import Savings from "../../../components/UserDashboard/cardsUserDashboard/SavingsCard";
import Investments from "../../../components/UserDashboard/cardsUserDashboard/InvestmentsCard";
import BankBalance from "../../../components/UserDashboard/cardsUserDashboard/BankBalanceCard";
import EmergencyCoins from "../../../components/UserDashboard/cardsUserDashboard/EmergencyCoinsCard";
import Wishlist from "../../../components/UserDashboard/cardsUserDashboard/WishlistCard";
import BalanceExpenses from "../../../components/UserDashboard/cardsUserDashboard/BalanceExpensesCard";
import BalanceIncome from "../../../components/UserDashboard/cardsUserDashboard/BalanceIncomeCard";
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