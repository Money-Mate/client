import React, { useState } from "react";
import { invests } from "./Investdata";
import { formatNumber } from "../../../utils/formatterFunctions";


type InvestmentType = "Aktien/ETF's" | "Kryptowährungen" | "Immobilien" | "Rohstoffe";


type Props = {
  setClickedData: (data: { label: string; value: number } | undefined) => void;
};

const AssetCard = ({ setClickedData }: Props) => {
  const [selectedType, setSelectedType] = useState<InvestmentType | null>(
    null
  );

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
      setClickedData(newSelectedType ? { label: newSelectedType, value: sumOfType } : undefined);
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
      <div className="flex justify-around items-center my-4 pb-5">
      <button
          className={`${
            selectedType === "Aktien/ETF's" ? "bg-teal-600" : "bg-sky-700"
          } hover:bg-teal-600 py-2 px-4 rounded-md font-semibold text-sm text-mm-text-white`}
          onClick={() => handleClick("Aktien/ETF's")}
        >
          Aktien/ETF's
        </button>
        <button
          className={`${
            selectedType === "Kryptowährungen" ? "bg-teal-600" : "bg-sky-700"
          } hover:bg-teal-600 py-2 px-4 rounded-md font-semibold text-sm text-mm-text-white`}
          onClick={() => handleClick("Kryptowährungen")}
        >
          Kryptowährungen
        </button>
        <button
          className={`${
            selectedType === "Immobilien" ? "bg-teal-600" : "bg-sky-700"
          } hover:bg-teal-600 py-2 px-4 rounded-md font-semibold text-sm text-mm-text-white`}
          onClick={() => handleClick("Immobilien")}
        >
          Immobilien
        </button>
        <button
          className={`${
            selectedType === "Rohstoffe" ? "bg-teal-600" : "bg-sky-700"
          } hover:bg-teal-600 py-2 px-4 rounded-md font-semibold text-sm text-mm-text-white`}
          onClick={() => handleClick("Rohstoffe")}
        >
          Rohstoffe
        </button>
      </div>
      <div className="">
        {investments.length > 0 ? (
          <ul className="list-inside list-none text-center pb-5">
            {investments.map((invest, index) => (
              <li className="text-mm-text-white py-1" key={index}>
                {invest.name}: {formatNumber(invest.value)}
              </li>
            ))}
          </ul>
        ) : (
            <p className="text-center text-mm-text-white pb-2">
                Bitte wähle eine Kategorie aus
            </p>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
