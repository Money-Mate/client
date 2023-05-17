import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  picture?: string;
  financialOptions?: {
    emergencyFund?: number;
    splitIncome?: {
      needs?: number;
      wants?: number;
      savings?: number;
    };
  };
};

export type UserStore = {
  user: User;
  updateUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "Willy",
    email: "Willy@aol.com",
    picture: "https://picsum.photos/200",
    financialOptions: {
      emergencyFund: 3000,
      splitIncome: {
        needs: 50,
        wants: 30,
        savings: 20,
      },
    },
  },
  updateUser: (user: User) => set({ user }),
}));
