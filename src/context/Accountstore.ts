import {create} from 'zustand';
import axios from 'axios';

interface IBankAccountData {
    _id: string;
    name: string;
    iban: string;
    reference: "name" | "iban";
}

interface AccountStore{
    bankAccountData: IBankAccountData[] | null;
    fetchBankAccountData: () => void;
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
            console.error("Failed to fetch dashboard data", error);
        }
    }
    
}));

export default useAccountStore;