import {create} from 'zustand';
import axios from 'axios';

interface IBankAccountData {
    name: string;
    iban: string;
    reference: string, enum : ["name", "iban"];
}

interface AccountStore{
    bankAccountData: IBankAccountData | null;
    fetchBankAccountData: () => void;
}

const useAccountStore = create<AccountStore>((set) => ({
    bankAccountData: null,
    fetchBankAccountData: async () => {
        try {
            const BE_URL = import.meta.env.VITE_BE_PORT
            const response = await axios.get<IBankAccountData>(`${BE_URL}/accounts`, {
                withCredentials: true,
            });
            set({ bankAccountData: response.data });
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        }
    }
    
}));

export default useAccountStore;