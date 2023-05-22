import { useState } from "react";
import { invests } from "./Investdata";
import { transactions } from "./Transaktionen";
import { formatNumber } from "../../../utils/formatterFunctions";
import * as z from "zod";
import isIBAN from "validator/lib/isIBAN"; 
import DangerAlert from "../../../components/dangerAlert";
import SuccessAlert from "../../../components/successAlert";

interface FormErrors {
  account?: string;
  name?: string;
  value?: number;
  amount?: number;
  buyIn?: number;
  dividend?: number;
  type?: string;
  symbol?: string;
}

interface TransactionFormErrors {
  account?: string;
  name?: string;
  value?: number;
  type?: string;
  date?: string;
}

const investmentSchema = z.object({
  account: z.string().refine((val) => isIBAN(val), { message: "bitte gib eine gültigen IBAN ein" }),
  name: z.string().min(1, "bitte gib einen Namen ein"),
  value: z.custom((val) => (val === "" || typeof val === "number" ? true : "")).optional(),
  amount: z.number().min(1, "bitte gib die Anzahl ein"),
  buyIn: z.number().min(1, "bitte gib den Kaufpreis ein"),
  dividend: z.custom((val) => (val === "" || typeof val === "number" ? true : "")).optional(),
  type: z.enum(["Aktien/ETF's", "Kryptowährungen", "Immobilien", "Rohstoffe"]),
  symbol: z.string().min(1, "bitte gib das dazugehörige Symbol ein"),
});

const transactionSchema = z.object({
  account: z.string().refine((val) => isIBAN(val), { message: "bitte gib eine gültige IBAN ein" }),
  name: z.string().min(1, "bitte gib einen Namen ein"),
  value: z.number(),
  type: z.enum(["Dividend", "Trade"]),
  date: z.string().min(1, "bitte gib ein Datum ein"),
});


interface FormData {
  account: string;
  name: string;
  value: number;
  amount: number;
  buyIn: number;
  dividend?: number;
  type: "Aktien/ETF's" | "Kryptowährungen" | "Immobilien" | "Rohstoffe";
  symbol?: string;
}

interface TransaktionData {
  account: string;
  name: string;
  value: number;
  type: "Dividend" | "Trade";
  date: string;
}

const InvestmentForm = ({ onSubmit }: any) => {
  const [formData, setFormData] = useState<FormData>({
    account: "",
    name: "",
    value: NaN,
    amount: NaN,
    buyIn: NaN,
    dividend: NaN,
    type: "Aktien/ETF's",
    symbol: "",
  });

  const [transactionData, setTransactionData] = useState<TransaktionData>({
    account: "",
    name: "",
    value: NaN,
    type: "Dividend",
    date: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [transactionFormErrors, setTransactionFormErrors] = useState<TransactionFormErrors>({});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInvestmentForm = (data: FormData) => {
    try {
      investmentSchema.parse(data);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: any = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const validateTransactionForm = (data: TransaktionData) => {
    try {
      transactionSchema.parse(data);
      setTransactionFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: any = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setTransactionFormErrors(errors);
      }
      return false;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "value" ||
        name === "amount" ||
        name === "buyIn" ||
        name === "dividend"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleTransactionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: name === "value" ? parseFloat(value) : value,
    }));
  };

  const addInvestment = (investment: FormData) => {
    invests.push(investment);
    // localStorage.setItem("invests", JSON.stringify(invests));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInvestmentForm(formData)) {
    addInvestment(formData);
    setSuccessMessage("Ok!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    setFormData({
      account: "",
      name: "",
      value: 0,
      amount: 0,
      buyIn: 0,
      dividend: 0,
      type: "Aktien/ETF's",
      symbol: "",
    });
    setShowForm(!showForm);
  }else{
    setErrorMessage("Bitte überprüfe deine Eingaben.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
  }
  }

  const addTransaction = (transaction: TransaktionData) => {
    transactions.push(transaction);
    // localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  const handleTransactionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateTransactionForm(transactionData)){
    addTransaction(transactionData);
    setTransactionData({
      account: "",
      name: "",
      value: 0,
      type: "Dividend",
      date: "",
    });
    setShowTransactionForm(!showTransactionForm);
  }};
  const [showForm, setShowForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

    

  return (
    <>
    {/* Success Alert */}
    {successMessage && (
            <SuccessAlert
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          )}
          {/* Error Alert */}
          {errorMessage && (
            <DangerAlert
              message={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          )}
        <div className="">
      <div className="flex mx-5 my-2 rounded bg-mm-foreground">

        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="m-2 mx-2 rounded bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75 border-2 border-mm-foreground"
            >
            Position hinzufügen
          </button>
        </div>
        <div>
          <button
            onClick={() => setShowTransactionForm(!showTransactionForm)}
            className="m-2 mx-2 rounded bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75 border-2 border-mm-foreground"
            >
            Transaktion hinzufügen
          </button>
        </div>
      </div>
            </div>
      <div className="flex">
        {showForm && (
          <form
            className="m-5 h-full w-1/2 rounded-md bg-mm-foreground p-5 text-mm-text-white shadow-lg"
            onSubmit={handleSubmit}
          >
            
            <div className="flex flex-col space-y-3">
            <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Konto:
                </label>
                {formErrors.account && <div className="text-red-500">{formErrors.account}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Name:
                </label>
                {formErrors.name && <div className="text-red-500">{formErrors.name}</div>}

                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Wert:
                </label>
                {formErrors.value && <div className="text-red-500">{formErrors.value}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="number"
                  name="value"
                  step="0.01"
                  value={formData.value}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Anzahl:
                </label>
                {formErrors.amount && <div className="text-red-500">bitte gib einen Wert ein</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="buyIn"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Einkaufswert:
                </label>
                {formErrors.buyIn && <div className="text-red-500">bitte gib einen Einkaufswert ein</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="number"
                  name="buyIn"
                  step="0.01"
                  value={formData.buyIn}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="dividend"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Dividende:
                </label>
                {formErrors.dividend && <div className="text-red-500">{formErrors.dividend}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="number"
                  name="dividend"
                  step="0.01"
                  value={formData.dividend}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Typ:
                </label>
                {formErrors.type && <div className="text-red-500">{formErrors.type}</div>}
                <select
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
                <label
                  className="mb-2 block font-bold text-mm-text-dark"
                  htmlFor="symbol"
                >
                  Symbol:
                </label>
                {formErrors.symbol && <div className="text-red-500">{formErrors.symbol}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="m-2 mx-2 rounded bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75 border-2 border-mm-foreground"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </form>
        )}
        {showTransactionForm && (
          <form
            className="m-5 h-full w-1/2 rounded-md bg-mm-foreground p-5 text-mm-text-white shadow-lg"
            onSubmit={handleTransactionSubmit}
          >
            
            <div className="flex flex-col space-y-3">
            <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Konto:
                </label>
                {transactionFormErrors.account && <div className="text-red-500">{transactionFormErrors.account}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  name="account"
                  value={transactionData.account}
                  onChange={handleTransactionChange}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Name:
                </label>
                {transactionFormErrors.name && <div className="text-red-500">{transactionFormErrors.name}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  name="name"
                  value={transactionData.name}
                  onChange={handleTransactionChange}
                />
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Wert:
                </label>
                {transactionFormErrors.value && <div className="text-red-500">bitte gib einen Wert ein</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="number"
                  name="value"
                  step="0.01"
                  value={transactionData.value}
                  onChange={handleTransactionChange}
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Typ:
                </label>
                {transactionFormErrors.type && <div className="text-red-500">{transactionFormErrors.type}</div>}
                <select
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  name="type"
                  value={transactionData.type}
                  onChange={handleTransactionChange}
                >
                  <option value="Dividend">Dividende</option>
                  <option value="Trade">Trading</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="value"
                  className="mb-2 block font-bold text-mm-text-dark"
                >
                  Datum:
                </label>
                {transactionFormErrors.date && <div className="text-red-500">{transactionFormErrors.date}</div>}
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="date"
                  name="date"
                  value={transactionData.date}
                  onChange={handleTransactionChange}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="m-2 mx-2 rounded bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75 border-2 border-mm-foreground"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {transactions && (
  <div className="m-5 h-full rounded-md text-mm-text-white shadow-lg">
    <table className="w-full bg-mm-background">
      <thead>
        <tr className="bg-mm-foreground text-sm uppercase leading-normal text-mm-text-white">
          <th className="w-3/12 px-6 py-3 text-left font-bold">Konto</th>
          <th className="w-3/9 px-6 py-3 text-left font-bold">Name</th>
          <th className="w-3/9 px-6 py-3 text-left font-bold md:table-cell">Wert</th>
          <th className="w-3/9 px-6 py-3 text-left font-bold">Typ</th>
          <th className="w-3/9 px-6 py-3 text-left font-bold">Datum</th>
          <th className="w-3/9 px-6 py-3 text-left font-bold"></th>


        </tr>
      </thead>
      <tbody className="text-sm font-light text-mm-text-white">
        {transactions && transactions.map((transaction, index) => (
   
          <tr key={transaction.name} className={index % 2 === 0 ? "bg-mm-background" : "bg-mm-foreground"}>
           <td className="px-6 py-3">{transaction.account}</td>
            <td className="px-6 py-3">{transaction.name}</td>
            <td className= {`px-6 py-6 ${
                transaction.value >= 0 ? "text-teal-500" : "text-red-600"
              }`} >
              {formatNumber(transaction.value)}
            </td>
            <td className="px-6 py-3">{transaction.type}</td>
            <td className="px-6 py-3">{transaction.date}</td>
            <td className="px-6 py-3">
            <button
                // onClick={() => handleDelete(invest.name)}
                className="m-1 bg-red-500 hover:bg-opacity-75 px-3 py-2 rounded-lg text-mm-text-white text-sm"
                >
                löschen
              </button>

            </td>
          </tr>
        ))}
        {transactions.length === 0 && (
          <tr>
            <td
              className="bg-mm-foreground px-6 py-3 text-left text-mm-text-dark"
              colSpan={4}
            >
              Zu deiner Anfrage gibt es keine passenden Daten
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}

    </>
  );
};

export default InvestmentForm;
