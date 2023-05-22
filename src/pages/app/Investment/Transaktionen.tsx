interface Transaction {
    account: string;
    name: string;
    value: number;
    type: string;
    date: string;
}

export const transactions: Transaction[] = [
    {   
        account: "DE60500105172843982176",
        name: "Apple",
        value: 0.07,
        type: "Dividend",
        date: "2023-05-01",
    },
    {
        account: "DE60500105172843982176",
        name: "Nasdaq Long",
        value: -20,
        type: "Trade",
        date: "2023-05-05",
    },
    {
        account: "DE60500105172843982176",
        name: "Nvidia",
        value: 0.34,
        type: "Dividend",
        date: "2023-05-08",
    },
    {
        account: "DE60500105172843982176",
        name: "Dax Short",    
        value: 120,
        type: "Trade",
        date: "2023-05-16",
    },
    // {
    //     name: "Dow",
    //     value: -230,
    //     type: "Trade",
    // },
    // {
    //     name: "Nasdaq",
    //     value: 50,
    //     type: "Trade",
    // },
]




