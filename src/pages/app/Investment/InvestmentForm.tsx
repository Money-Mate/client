import { useState } from "react";
import {invests} from "./Investdata";
import {transactions} from "./Transaktionen"; 
import { formatNumber } from "../../../utils/formatterFunctions";

interface FormData {
  name: string;
  value: number;
  amount: number;
  buyIn: number;
  dividend?: number;
  type: "Aktien/ETF's" | "Kryptowährungen" | "Immobilien" | "Rohstoffe";
  symbol?: string;
}

interface TransaktionData {
  name: string;
  value: number;
  type: "Dividend" | "Trade";
}

const InvestmentForm = ({ onSubmit }: any) => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    value: 0,
    amount: 0,
    buyIn: 0,
    dividend: 0,
    type: "Aktien/ETF's",
    symbol: "",
  });
  
  const [transactionData, setTransactionData] = useState<TransaktionData>({
    name: "",
    value: 0,
    type: "Dividend",
  });
  console.log(transactionData)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: (name === "value" || name === "amount" || name === "buyIn" || name === "dividend") ? parseFloat(value) : value }));
  };

  const handleTransactionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: name === "value" ? parseFloat(value) : value }));
  };

  const addInvestment = (investment: FormData) =>{
    invests.push(investment);
    // localStorage.setItem("invests", JSON.stringify(invests));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addInvestment(formData);
    setFormData({
      name: "",
      value: 0,
      amount: 0,
      buyIn: 0,
      dividend: 0,
      type: "Aktien/ETF's",
      symbol: "",
    });
    setShowForm(!showForm)
  };


  const addTransaction = (transaction: TransaktionData) =>{
    transactions.push(transaction);
    // localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  const handleTransactionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTransaction(transactionData);
    setTransactionData({
      name: "",
      value: 0,
      type: "Dividend",
    });
    setShowTransactionForm(!showTransactionForm)
  };
  const [showForm, setShowForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <>
      <div className="flex justify-evenly">
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="m-5 rounded bg-sky-600 px-4 py-2 font-bold text-mm-text-white hover:bg-sky-700"
          >
            Füge eine Position hinzu
          </button>
        </div>
        <div>
          <button
            onClick={() => setShowTransactionForm(!showTransactionForm)}
            className="m-5 rounded bg-sky-600 px-4 py-2 font-bold text-mm-text-white hover:bg-sky-700"
          >
            Füge eine Transaktion hinzu
          </button>
        </div>
      </div>
      {showForm && (
        <form
          className="m-5 h-full rounded-md p-5 text-mm-text-white shadow-lg bg-mm-foreground"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-3">
            <div>
              <label htmlFor="name" className="font-semibold text-mm-text-white">
                Name:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="value" className="font-semibold text-mm-text-white">
                Wert:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="number"
                name="value"
                step="0.01"
                value={formData.value}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="amount" className="font-semibold text-mm-text-white">
                Anzahl:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="buyIn" className="font-semibold text-mm-text-white">
                Einkaufswert:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="number"
                name="buyIn"
                step="0.01"
                value={formData.buyIn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dividend" className="font-semibold text-mm-text-white">
                Dividende:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="number"
                name="dividend"
                step="0.01"
                value={formData.dividend}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="type" className="font-semibold text-mm-text-white">
                Typ:
              </label>
              <select
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Aktien/ETF's">Aktien/ETF's</option>
                <option value="Kryptowährungen">Kryptowährungen</option>
                <option value="Immobilien">Immobilien</option>
                <option value="Rohstoffe">Rohstoffe</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-mm-text-white" htmlFor="symbol">
                Symbol:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="rounded bg-sky-600 px-4 py-2 font-bold text-mm-text-white hover:bg-sky-700"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </form>
      )}
      {showTransactionForm && (
        <form
          className="m-5 h-full rounded-md p-5 text-mm-text-white shadow-lg bg-mm-foreground"
          onSubmit={handleTransactionSubmit}
        >
          <div className="flex flex-col space-y-3">
            <div>
              <label htmlFor="name" className="font-semibold text-mm-text-white">
                Name:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="text"
                name="name"
                value={transactionData.name}
                onChange={handleTransactionChange}
              />
            </div>

            <div>
              <label htmlFor="value" className="font-semibold text-mm-text-white">
                Wert:
              </label>
              <input
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="number"
                name="value"
                step="0.01"
                value={transactionData.value}
                onChange={handleTransactionChange}
              />
            </div>
            <div>
              <label htmlFor="type" className="font-semibold text-mm-text-white">
                Typ:
              </label>
              <select
                className="mt-1 w-full rounded-md bg-mm-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                name="type"
                value={transactionData.type}
                onChange={handleTransactionChange}
              >
                <option value="Dividend">Dividende</option>
                <option value="Trade">Trading</option>
              </select>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="rounded bg-sky-600 px-4 py-2 font-bold text-mm-text-white hover:bg-sky-700"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </form>
      )}
      {transactions && (
        <div className="m-5 h-full rounded-md p-5 bg-mm-foreground text-mm-text-white shadow-lg">
          {transactions.map((transaction) => (
            <ul key={transaction.name}>
              <li>
                {transaction.name} {formatNumber(transaction.value)} {transaction.type}
              </li>
            </ul>
            ))}
        </div>
      )} 
    </>
  );
};

export default InvestmentForm;
