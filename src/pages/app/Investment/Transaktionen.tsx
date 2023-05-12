interface Transaction {
    name: string;
    value: number;
    type: string;
}

export const transactions: Transaction[] = [
    {
        name: "Tesla",
        value: 1.34,
        type: "Dividend",
    },
    {
        name: "Nasdaq",
        value: -20,
        type: "Trade",
    },
    {
        name: "Apple",
        value: 2.34,
        type: "Dividend",
    },
    {
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
console.log(transactions)




