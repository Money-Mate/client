import { create } from "zustand";

export const useUserStore = create<{isLoggedIn: boolean}>((set) => ({
    isLoggedIn: false,
}));

