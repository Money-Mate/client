import {create} from 'zustand';
import axios from 'axios';

export interface IBankAccountData {
    _id: string;
    name: string;
    iban: string;
    reference: "name" | "iban";
}

interface AccountStore{
    bankAccountData: IBankAccountData[] | null;
    fetchBankAccountData: () => void;
    addBankAccount: (newAccount: IBankAccountData) => void;
    updateBankAccount: (updatedAccount: IBankAccountData) => void;
    deleteBankAccount: (id: string) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
    bankAccountData: null,
    fetchBankAccountData: async () => {
        try {
            const BE_URL = import.meta.env.VITE_BE_PORT
            const response = await axios.get<IBankAccountData[]>(`${BE_URL}/account/getAllMy`, {
                withCredentials: true,
            });
            set({ bankAccountData: response.data });
        } catch (error) {
            console.error("Failed to fetch account data", error);
        }
    },
    addBankAccount: async (newAccount: IBankAccountData) => {
        try{
            const BE_URL = import.meta.env.VITE_BE_PORT
            const res = await axios.post<IBankAccountData[]>(`${BE_URL}/account/add`, newAccount, {
                withCredentials: true,
            });
            const response = await axios.get<IBankAccountData[]>(`${BE_URL}/account/getAllMy`, {
                withCredentials: true,
            });
            set({ bankAccountData: response.data });
            // set({ bankAccountData: response.data });

        }catch  (error) {
            console.error("Failed to add account", error);
        }
    },
    updateBankAccount: async (updatedAccount: IBankAccountData) => {
        try{
            const BE_URL = import.meta.env.VITE_BE_PORT
            const res = await axios.put<IBankAccountData[]>(`${BE_URL}/account/updateMy`, updatedAccount, {
                withCredentials: true,
            });
            const response = await axios.get<IBankAccountData[]>(`${BE_URL}/account/getAllMy`, {
                withCredentials: true,
            });
            set({ bankAccountData: response.data });
            
        }catch  (error) {
            console.error("Failed to update account", error);
        }
    },
    deleteBankAccount: async (id: string) => {
        try{
            const BE_URL = import.meta.env.VITE_BE_PORT
            const res = await axios.delete<IBankAccountData[]>(`${BE_URL}/account/deleteMy/${id}`, {
                withCredentials: true,
            });
            const response = await axios.get<IBankAccountData[]>(`${BE_URL}/account/getAllMy`, {
                withCredentials: true,
            });
            set({ bankAccountData: response.data });
            
        }catch  (error) {
            console.error("Failed to delete account", error);
        }
    }
}));

export default useAccountStore;