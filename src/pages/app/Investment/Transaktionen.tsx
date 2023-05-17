interface Transaction {
    account: string;
    name: string;
    value: number;
    type: string;
}

export const transactions: Transaction[] = [
    {   
        account: "DE60500105172843982176",
        name: "Tesla",
        value: 0.07,
        type: "Dividend",
    },
    {
        account: "DE60500105172843982176",
        name: "Nasdaq",
        value: -20,
        type: "Trade",
    },
    {
        account: "DE60500105172843982176",
        name: "Apple",
        value: 0.34,
        type: "Dividend",
    },
    {
        account: "DE60500105172843982176",
        name: "Dax",    
        value: 120,
        type: "Trade",
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




