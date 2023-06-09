import { useEffect } from "react";
import useDashboardStore from "../../../context/DashboardStore";
import BalanceExpenses from "./cardsUserDashboard/BalanceExpensesCard";
import BalanceIncome from "./cardsUserDashboard/BalanceIncomeCard";
import BankBalance from "./cardsUserDashboard/BankBalanceCard";
import BudgetExpenses from "./cardsUserDashboard/BudgetExpensesCard";
import EmergencyCoins from "./cardsUserDashboard/EmergencyCoinsCard";
import IncomeExpensesCard from "./cardsUserDashboard/ExpensesIncomeCard";
import SaldoLastSixMonth from "./cardsUserDashboard/SaldoLastSixMonthCard";
import Savings from "./cardsUserDashboard/SavingsCard";
import Wishlist from "./cardsUserDashboard/WishlistCard";

import "chart.js/auto";
import LoadingSymbol from "../../../components/LoadingSymbol";
import { fetchInvests } from "../Investment/Fetch";
import { fetchCoin } from "../Investment/FetchKrypto";
import ExpensesPieCard from "./cardsUserDashboard/ExpensesPieCard";

function Dashboard() {
  const { dashboardData, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
    fetchInvests();
    fetchCoin();
  }, []);

  if (!dashboardData) {
    return <LoadingSymbol />;
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
        <IncomeExpensesCard />
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
        <ExpensesPieCard />
      </div>
    </div>
  );
}

export default Dashboard;
