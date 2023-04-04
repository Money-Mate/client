import { create } from "zustand";

export const useUserStore = create((set) => ({
    isLoggedIn: false,
}));