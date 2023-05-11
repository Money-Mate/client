import { create } from 'zustand';

export type User = {
  username: string;
  email: string;
  profilePicture: string;
  financialOptions: {
    trackHabits: boolean;
    trackHabitsSettings: {
      budgets: {
        isTracked: boolean;
        budgetItems: {
          [key: string]: {
            now: number;
            of: number;
            percent: number;
          };
        }
      };
      emergencyFund: {
        isTracked: boolean;
        amountEmergencyFund: number;
      };
      goalsWishlist: {
        isTracked: boolean;
        wishlistItems: {
          [key: string]: {
            now: number;
            of: number;
            percent: number;
            fulfilled: boolean;
          };
        };
      };
      rule305020: {
        isTracked: boolean;
        isCustomized: boolean;
        customAmounts: {
          needs: number;
          wants: number;
          savings: number;
        };
      };
      avoidDebts: {
        isTracked: boolean;
        isCustomized: boolean;
        customAmounts: {
          credit: number;
          overdraft: number;
        };
      };
    };
  };
};

export type UserStore = {
  user: User;
  updateUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    username: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://picsum.photos/200',
    financialOptions: {
      trackHabits: true,
      trackHabitsSettings: {
        budgets: {
          isTracked: true,
          budgetItems: {

            Steam: { now: 30, of: 200, percent: 15 },
            Food: { now: 30, of: 1500, percent: 20 },
            Rabbitfood: { now: 50, of: 100, percent: 50 },
          }
        },
        emergencyFund: {
          isTracked: true,
          amountEmergencyFund: 0,
        },
        goalsWishlist: {
          isTracked: true,
          wishlistItems: {
            Car: { now: 0, of: 10000, percent: 0, fulfilled: false },
            House: { now: 0, of: 100000, percent: 0, fulfilled: false },
          },
        },
        rule305020: {
          isTracked: true,
          isCustomized: false,
          customAmounts: {
            needs: 30,
            wants: 50,
            savings: 20,
          },
        },
        avoidDebts: {
          isTracked: true,
          isCustomized: false,
          customAmounts: {
            credit: 0,
            overdraft: 0,
          },
        },
      },
    },
  },
  updateUser: (user: User) => set({ user }),
}));
