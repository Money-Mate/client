import { create } from "zustand";
import axios from "axios";

interface LastSixMonthsBalance {
  labels: string[];
  data: number[];
}

interface LastSixMonthsIncomeAndExpenses {
  labels: string[];
  data: {
    income: number[];
    expenses: number[];
  };
}

interface IDashboardData {
  user: string;
  bankBalance: number;
  saved: number;
  scheduledDebit: number;
  balanceEndOfMonth: number;
  expensesForThisMonth: number;
  incomeForThisMonth: number;
  lastSixMonthsBalance: LastSixMonthsBalance;
  lastSixMonthsIncomeAndExpenses: LastSixMonthsIncomeAndExpenses;
  emergencyFundPercent: number;
  lastSixMonthsExpensesByCategory:{
    category: string;
    subcategory: string;
    amount: number;
  }
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

