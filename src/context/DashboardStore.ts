import axios from "axios";
import { create } from "zustand";
interface LastSixMonthsBalance {
  labels: string[];
  data: number[];
}
interface lastSixMonthsExpensesByCategory {
  category: string;
  subCategory: string;
  amount: number;
}
interface LastSixMonthsIncomeAndExpenses {
  labels: string[];
  data: {
    income: number[];
    expenses: number[];
  };
}

interface BudgetlistItem {
  now: number;
  of: number;
  percent: number;
}

interface Budgetlist {
  [itemName: string]: BudgetlistItem;
}

interface WishlistItem {
  now: number;
  of: number;
  percent: number;
  canAfford: boolean;
}

interface Wishlist {
  [itemName: string]: WishlistItem;
}

export interface IDashboardData {
  user: string;
  bankBalance: number;
  saved: number;
  scheduledDebit: number;
  balanceEndOfMonth: number;
  expensesForThisMonth: number;
  incomeForThisMonth: number;
  lastSixMonthsBalance: LastSixMonthsBalance;
  lastSixMonthsExpensesByCategory: lastSixMonthsExpensesByCategory[];
  lastSixMonthsIncomeAndExpenses: LastSixMonthsIncomeAndExpenses;
  budgetlist: Budgetlist;
  wishlist: Wishlist;
  emergencyFundPercent: number;
}
interface DashboardStore {
  dashboardData: IDashboardData | null;
  fetchDashboardData: () => void;
}
const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardData: null,
  fetchDashboardData: async () => {
    try {
      const BE_URL = import.meta.env.VITE_BE_PORT;
      const response = await axios.get<IDashboardData>(
        `${BE_URL}/dashboard/main`,
        {
          withCredentials: true,
        }
      );
      set({ dashboardData: response.data });
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  },
}));
export default useDashboardStore;
