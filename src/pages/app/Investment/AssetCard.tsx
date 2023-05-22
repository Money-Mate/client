import React, { useState } from "react";
import { invests, deleteInvests } from "./Investdata";
import { formatNumber } from "../../../utils/formatterFunctions";

type InvestmentType =
| "Aktien/ETF's"
| "Kryptowährungen"
| "Immobilien"
| "Rohstoffe";

type Props = {
  setClickedData: (data: { label: string; value: number } | undefined) => void;
};


const AssetCard = ({ setClickedData }: Props) => {
  const [selectedType, setSelectedType] = useState<InvestmentType | null>(null);
  
  const handleClick = (type: InvestmentType) => {
    setSelectedType((prevSelectedType) => {
      const newSelectedType = prevSelectedType === type ? null : type;
      const investmentsOfType = invests.filter(
        (invest) => invest.type === newSelectedType
        );
        const sumOfType = investmentsOfType.reduce(
        (acc, curr) => acc + curr.value,
        0
        );
        setClickedData(
          newSelectedType
          ? { label: newSelectedType, value: sumOfType }
          : undefined
          );
          return newSelectedType;
        });
      };
      
      const investments = selectedType
      ? invests.filter((invest) => invest.type === selectedType)
      : [];
      
      const handleDelete = (name: string) => {
        const newInvests = invests.filter((invest) => invest.name !== name);
        console.log(newInvests);
        deleteInvests(newInvests);
      }
      
      return (
        <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 text-center text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3">
        Positionen
      </h2>


      <div className="my-4 flex items-center justify-around pb-5">
        <button
          className={`${
            selectedType === "Aktien/ETF's" ? "bg-teal-600" : "bg-sky-600"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Aktien/ETF's")}
        >
          Aktien/ETF's
        </button>
        <button
          className={`${
            selectedType === "Kryptowährungen" ? "bg-teal-600" : "bg-sky-600"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Kryptowährungen")}
          >
          Kryptowährungen
        </button>
        <button
          className={`${
            selectedType === "Immobilien" ? "bg-teal-600" : "bg-sky-600"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Immobilien")}
        >
          Immobilien
        </button>
        <button
          className={`${
            selectedType === "Rohstoffe" ? "bg-teal-600" : "bg-sky-600"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Rohstoffe")}
        >
          Rohstoffe
        </button>
      </div>
      <div className="m-2 p-2">
  {investments.length > 0 ? (
    <table className=" table-fixed w-full text-center border-collapse">
      <thead>
        <tr className="bg-sky-700 text-mm-text-white">
          <th className="w-2/12 p-2">Name</th>
          <th className="w-2/12 p-2">Anzahl</th>
          <th className="w-2/12 p-2">Einkaufswert</th>
          <th className="w-2/12 p-2">Wert</th>
          <th className="w-2/12 p-2">Gesamtwert</th>
          <th className="w-2/12 p-2">Gewinn/Verlust</th>
          <th className="w-2/12 p-2"></th>
          {investments.some((invest) => invest.dividend ) && (
            <th className="w-2/12 p-2">Dividende p.A.</th>
          )}
        </tr>
      </thead>
      <tbody>
        {investments.map((invest, index) => (
          <tr className="text-mm-text-white" key={index}>
            <td>{invest.name}</td>
            <td>{invest.amount}</td>
            <td>{formatNumber(invest.buyIn)}</td>
            <td>{formatNumber(invest.value)}</td>
            <td>{formatNumber(invest.amount * invest.value)}</td>
            <td
              className={`${
                invest.amount * (invest.value - invest.buyIn) >= 0 ? "text-teal-500" : "text-red-600"
              }` } 
              >
              {formatNumber(invest.amount * (invest.value - invest.buyIn))} ({((invest.value - invest.buyIn) / invest.buyIn * 100).toFixed(2)}%)
            </td>
            <td className="p-2">
              <button
                // onClick={() => handleEdit(invest.id)}
                className="m-1 bg-mm-primary hover:bg-opacity-75 px-3 py-2 rounded-lg text-mm-text-white text-sm"
                >
                bearbeiten
              </button>
              <button
                onClick={() => handleDelete(invest.name)}
                className="m-1 bg-red-500 hover:bg-opacity-75 px-3 py-2 rounded-lg text-mm-text-white text-sm"
                >
                löschen
              </button>
            </td>
                {invest.dividend? (
                  <td>{formatNumber(invest.value * invest.amount * (invest.dividend ?? 0) / 1000)} ({invest.dividend}%)</td>
                ) : (
                  <td></td>
                )}
          </tr>
        ))}
      </tbody>
    </table>
  ) : null}
</div>

    </div>
  );
};

export default AssetCard;
