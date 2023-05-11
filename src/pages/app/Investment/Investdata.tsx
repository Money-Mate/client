interface Investment {
  name: string;
  value: number;
  amount: number;
  buyIn: number;
  dividend?: number;
  type: string;
  symbol?: string;
}

export const invests: Investment[] = [
  {
    name: "Apple",
    value: 1000.45,
    amount: 3,
    buyIn: 12560,
    dividend: 0.45,
    type: "Aktien/ETF's",
    symbol: "AAPL",
  },
  {
    name: "Tesla",
    value: 2500,
    amount: 4,
    buyIn: 500,
    dividend: 0.34,
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
    value: 4000,
    amount: 1,
    buyIn: 120,
    dividend: 0,
    type: "Kryptowährungen",
    symbol: "",
  },
  {
    name: "Ethereum",
    value: 7000,
    amount: 1,
    buyIn: 120,
    dividend: 0,
    type: "Kryptowährungen",
    symbol: "",
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
    value: 2000,
    amount: 5,
    buyIn: 120,
    dividend: 0,
    type: "Rohstoffe",
    symbol: "",
  },
  {
    name: "Silber",
    value: 3000,
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
    dividend: 1.23,
    type: "Aktien/ETF's",
    symbol: "MSFT",
  },
  {
    name: "Nvidia",
    value: 3700,
    amount: 3,
    buyIn: 120,
    dividend: 0,
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
