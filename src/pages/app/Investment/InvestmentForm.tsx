import { useState } from "react";

interface FormData {
  name: string;
  value: number;
  amount: number;
  buyIn: number;
  dividend: number;
  type: "Aktien/ETF's" | "Kryptowährungen" | "Immobilien" | "Rohstoffe";
  symbol: string;
}


const InvestmentForm =  ({ onSubmit }:any) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    value: 0,
    amount: 0,
    buyIn: 0,
    dividend: 0,
    type: "Aktien/ETF's",
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
      type: "Aktien/ETF's",
      symbol: "",
    });
  };

  return (
    <form className="p-5 h-full rounded-md  bg-mm-foreground shadow-lg text-mm-primary" onSubmit={handleSubmit}>
        <div className="">

      <label htmlFor="name">Name:</label>
      <input className="bg-mm-background" type="text" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="value">Wert:</label>
      <input className="bg-mm-background" type="number" name="value" value={formData.value} onChange={handleChange} />

      <label htmlFor="amount">Anzahl:</label>
      <input className="bg-mm-background" type="number" name="amount" value={formData.amount} onChange={handleChange} />

      <label htmlFor="buyIn">Einkaufswert:</label>
      <input className="bg-mm-background" type="number" name="buyIn" value={formData.buyIn} onChange={handleChange} />

      <label htmlFor="dividend">Dividende:</label>
      <input className="bg-mm-background" type="number" name="dividend" value={formData.dividend} onChange={handleChange} />

      <label htmlFor="type">Typ:</label>
      <select className="bg-mm-background" name="type" value={formData.type} onChange={handleChange}>
        <option value="Aktien/ETF's">Aktien/ETF's</option>
        <option value="Kryptowährungen">Kryptowährungen</option>
        <option value="Immobilien">Immobilien</option>
        <option value="Rohstoffe">Rohstoffe</option>
      </select>

      <label htmlFor="symbol">Symbol:</label>
      <input className="bg-mm-background" type="text" name="symbol" value={formData.symbol} onChange={handleChange} />

      <button type="submit">Hinzufügen</button>
        </div>
    </form>
  );
};

export default InvestmentForm;
