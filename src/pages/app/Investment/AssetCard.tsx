import React, { useState } from "react";
import { invests } from "./Investdata";
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

  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Positionen
      </h2>

      <p className="pb-2 text-center text-mm-text-white">
        Bitte wähle eine Kategorie aus
      </p>

      <div className="my-4 flex items-center justify-around pb-5">
        <button
          className={`${
            selectedType === "Aktien/ETF's" ? "bg-teal-600" : "bg-sky-700"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Aktien/ETF's")}
        >
          Aktien/ETF's
        </button>
        <button
          className={`${
            selectedType === "Kryptowährungen" ? "bg-teal-600" : "bg-sky-700"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Kryptowährungen")}
        >
          Kryptowährungen
        </button>
        <button
          className={`${
            selectedType === "Immobilien" ? "bg-teal-600" : "bg-sky-700"
          } rounded-md px-4 py-2 text-sm font-semibold text-mm-text-white hover:bg-teal-600`}
          onClick={() => handleClick("Immobilien")}
        >
          Immobilien
        </button>
        <button
          className={`${
            selectedType === "Rohstoffe" ? "bg-teal-600" : "bg-sky-700"
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
          <th className="w-2/12 p-2">Amount</th>
          <th className="w-2/12 p-2">Buy In</th>
          <th className="w-2/12 p-2">Value</th>
          <th className="w-2/12 p-2">Profit/Loss</th>
          <th className="w-2/12 p-2">Actions</th>
          {investments.some((invest) => invest.dividend ) && (
            <th className="w-2/12 p-2">Dividend</th>
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
            <td
              className={`${
                invest.amount * (invest.value - invest.buyIn) >= 0 ? "text-green-500" : "text-red-500"
              }`}
              >
              {formatNumber(invest.amount * (invest.value - invest.buyIn))}
            </td>
            <td className="p-2">
              <button
                // onClick={() => handleEdit(invest.id)}
                className="mx-2 bg-teal-600 hover:bg-teal-700 px-2 py-1 rounded-md text-white text-sm"
                >
                Edit
              </button>
              <button
                // onClick={() => handleDelete(invest.id)}
                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md text-white text-sm"
                >
                Delete
              </button>
            </td>
                {invest.dividend? (
                  <td>{invest.dividend}%</td>
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
