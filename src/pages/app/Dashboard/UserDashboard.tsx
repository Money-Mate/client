import { useEffect } from "react";
import BudgetExpenses from "./cardsUserDashboard/BudgetExpensesCard";
import SaldoLastSixMonth from "./cardsUserDashboard/SaldoLastSixMonthCard";
import Savings from "./cardsUserDashboard/SavingsCard";
import Investments from "./cardsUserDashboard/InvestmentsCard";
import BankBalance from "./cardsUserDashboard/BankBalanceCard";
import EmergencyCoins from "./cardsUserDashboard/EmergencyCoinsCard";
import Wishlist from "./cardsUserDashboard/WishlistCard";
import BalanceExpenses from "./cardsUserDashboard/BalanceExpensesCard";
import BalanceIncome from "./cardsUserDashboard/BalanceIncomeCard";
import useDashboardStore from "../../../context/DashbordStore";
import ExpenseIncomeChart from "./chartsUserDasboard/ExpensesIncome";

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
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-6">
        <SaldoLastSixMonth />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-6">
        <ExpenseIncomeChart />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-3">
        <Wishlist />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-3">
        <EmergencyCoins />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-3">
        <BudgetExpenses />
      </div>
      <div className="h-80 rounded-lg sm:col-span-4 lg:col-span-3">
        <Investments />
      </div>
    </div>
  );
}

export default Dashboard;
