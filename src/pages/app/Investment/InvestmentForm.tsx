import { useState } from "react";

interface FormData {
  name: string;
  value: number;
  amount: number;
  buyIn: number;
  dividend: number;
  type: "Stocks" | "Real Estate" | "Crypto" | "Commodities";
  symbol: string;
}


const InvestmentForm =  ({ onSubmit }:any) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    value: 0,
    amount: 0,
    buyIn: 0,
    dividend: 0,
    type: "Stocks",
    symbol: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      value: 0,
      amount: 0,
      buyIn: 0,
      dividend: 0,
      type: "Stocks",
      symbol: "",
    });
  };

  return (
    <form className="p-5 h-full rounded-md  bg-mm-foreground shadow-lg text-mm-primary" onSubmit={handleSubmit}>
        <div className="">

      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="value">Value:</label>
      <input type="number" name="value" value={formData.value} onChange={handleChange} />

      <label htmlFor="amount">Amount:</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} />

      <label htmlFor="buyIn">Buy In:</label>
      <input type="number" name="buyIn" value={formData.buyIn} onChange={handleChange} />

      <label htmlFor="dividend">Dividend:</label>
      <input type="number" name="dividend" value={formData.dividend} onChange={handleChange} />

      <label htmlFor="type">Type:</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Stocks">Stocks</option>
        <option value="Real Estate">Real Estate</option>
        <option value="Crypto">Krypto</option>
        <option value="Commodities">Edelmetalle</option>
      </select>

      <label htmlFor="symbol">Symbol:</label>
      <input type="text" name="symbol" value={formData.symbol} onChange={handleChange} />

      <button type="submit">Add</button>
        </div>
    </form>
  );
};

export default InvestmentForm;
