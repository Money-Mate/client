import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/formatterFunctions";
import Investments from "./Investments";
import { invests } from "./Investdata";
import { fetchInvests } from "./Fetch";

function CardNineInvestments() {
  const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    fetchInvests();
      setTimeout(() => {
      const stocks = invests.filter((invest) => invest.type === "Aktien/ETF's").reduce((acc, curr) => acc + (curr.value * curr.amount), 0)
      const crypto = invests.filter((invest) => invest.type === "Kryptowährungen").reduce((acc, curr) => acc + (curr.value * curr.amount), 0)
      const realEstate = invests.filter((invest) => invest.type === "Immobilien").reduce((acc, curr) => acc + (curr.value * curr.amount), 0)
      const commodities = invests.filter((invest) => invest.type === "Rohstoffe").reduce((acc, curr) => acc + (curr.value * curr.amount), 0)
      const total = stocks + crypto + realEstate + commodities
      setSum(total);
      
    }, 1000);


  }, []);
  
  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 text-center text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3">
        Investitionen
      </h2>
      {!clickedData && (
        <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
          Total: {formatNumber(sum)}
        </p>
      )}
      {clickedData && (
        <div>
          <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
            {clickedData?.label}: {formatNumber(clickedData?.value)}
          </p>
        </div>
      )}
      <div className="flex h-48 w-full items-center justify-center p-1">
        <Investments setClickedData={setClickedData} />
      </div>
    </div>
  );
}

export default CardNineInvestments;
