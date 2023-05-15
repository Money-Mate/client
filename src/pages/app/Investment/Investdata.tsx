interface Investment {
  name: string;
  value: number;
  amount: number;
  buyIn: number;
  dividend?: number;
  type: string;
  symbol?: string;
}

export const deleteInvests = (newInvests: Investment[]) => {
  invests = newInvests;
}

export let invests: Investment[] = [
  {
    name: "Apple",
    value: 1000.45,
    amount: 3,
    buyIn: 12560,
    dividend: 1.61,
    type: "Aktien/ETF's",
    symbol: "AAPL",
  },
  {
    name: "Tesla",
    value: 2500,
    amount: 4,
    buyIn: 500,
    dividend: 0,
    type: "Aktien/ETF's",
    symbol: "TSLA",
  },
  {
    name: "Einzimmerwohnung",
    value: 3000,
    amount: 1,
    buyIn: 120,
    dividend: 0,
    type: "Immobilien",
    symbol: "",
  },
  {
    name: "Bitcoin",
    value: 25282.30,
    amount: 0.03,
    buyIn: 18000,
    dividend: 0,
    type: "Kryptowährungen",
    symbol: "btc-bitcoin",
  },
  {
    name: "Ethereum",
    value: 1684.76,
    amount: 0.5,
    buyIn: 1700,
    dividend: 0,
    type: "Kryptowährungen",
    symbol: "eth-ethereum",
  },
  {
    name: "Strandvilla",
    value: 3000,
    amount: 1,
    buyIn: 120,
    dividend: 0,
    type: "Immobilien",
    symbol: "",
  },
  {
    name: "Flughafen Tegel",
    value: 3000,
    amount: 1,
    buyIn: 120,
    dividend: 0,
    type: "Immobilien",
    symbol: "",
  },
  {
    name: "Gold",
    value: 200,
    amount: 5,
    buyIn: 120,
    dividend: 0,
    type: "Rohstoffe",
    symbol: "",
  },
  {
    name: "Silber",
    value: 300,
    amount: 5,
    buyIn: 120,
    dividend: 0,
    type: "Rohstoffe",
    symbol: "",
  },
  {
    name: "Microsoft",
    value: 3000,
    amount: 3,
    buyIn: 120,
    dividend: 1,
    type: "Aktien/ETF's",
    symbol: "MSFT",
  },
  {
    name: "Nvidia",
    value: 3700,
    amount: 3,
    buyIn: 120,
    dividend: 0.61,
    type: "Aktien/ETF's",
    symbol: "NVDA",
  },
].sort((a, b) => b.value - a.value);


export const calculateDividendSum = (invests: Investment[]) => {
  let dividendSum = 0;
  invests.forEach((invest) => {
    dividendSum +=
      (invest.value * invest.amount * (invest.dividend ?? 0)) / 1000;
  });
  return dividendSum;
};
